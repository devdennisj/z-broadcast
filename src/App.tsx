import { z } from "zod";
import useChannel from "./useChannel";

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
