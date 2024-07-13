import { useState } from "react";
import { type ZodError, type ZodSchema, z } from "zod";

export interface UseBroadcastOptions {
  name: string;
  schema: ZodSchema;
}

export type ParseBroadcastReturn<T> = {
  success?: boolean;
  data: T | undefined;
  error?: ZodError<unknown>;
};

function useChannel<T>({ name, schema }: UseBroadcastOptions) {
  const broadcastChannel = new BroadcastChannel(name);

  const [data, setData] = useState<ParseBroadcastReturn<T>>({
    success: false,
    data: undefined,
    error: undefined,
  });

  const parseData = (data: unknown, onSuccess?: () => void) => {
    const parsed = schema.safeParse(data);

    if (onSuccess) {
      onSuccess();
    }

    if (parsed.success) {
      setData(parsed);
      return;
    }

    setData({ error: parsed.error, success: false, data: undefined });
  };

  broadcastChannel.onmessage = (event) => {
    parseData(event.data);
  };

  return {
    data,
    postMessage: (message: unknown) => {
      parseData(message, () => {
        broadcastChannel.postMessage(message);
      });
    },
  };
}

const schema = z.object({
  name: z.string(),
});

type Message = z.infer<typeof schema>;

function App() {
  const { data, postMessage } = useChannel<Message>({
    name: "new_test_channel",
    schema,
  });

  return (
    <>
      <h1>Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button
        type="button"
        onClick={() => {
          postMessage({ name: "dennis" });
        }}
      >
        parse
      </button>
    </>
  );
}

export default App;
