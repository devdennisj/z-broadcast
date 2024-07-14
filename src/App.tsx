import { z } from "zod";
import useChannel from "./useChannel";

const schema = z.object({
  name: z.string(),
});

type Message = z.infer<typeof schema>;

const secondSchema = z.object({
  name: z.string(),
  age: z.number(),
});

type SecondMessage = z.infer<typeof secondSchema>;

function App() {
  const { data, postMessage } = useChannel<Message>({
    name: "new_test_channel",
    schema,
  });

  const { data: secondData, postMessage: postSecondMessage } =
    useChannel<SecondMessage>({
      name: "second_test_channel",
      schema: secondSchema,
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

      <h1>Second Data</h1>
      <pre>{JSON.stringify(secondData, null, 2)}</pre>
      <button
        type="button"
        onClick={() => {
          postSecondMessage({ name: "blargh", age: 10 });
        }}
      >
        parse
      </button>
    </>
  );
}

export default App;
