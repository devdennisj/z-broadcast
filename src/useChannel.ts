import { useState } from "react";
import type { z } from "zod";
import type { SafeParseData, UseBroadcastOptions } from "./types";

/**
 * A typed version of the BroadcastChannel API that validates using Zod
 * @property {string} id - Must match between the sender and receiver but unique across your application
 * @property {z.ZodType} schema - The Zod schema to validate data.
 */
export default function useChannel<T>({ id, schema }: Readonly<UseBroadcastOptions<T>>) {
	const [data, setData] = useState<SafeParseData<T> | undefined>(undefined);

	const broadcastChannel = new BroadcastChannel(id);

	const postMessage = (message: z.infer<typeof schema>) => {
		broadcastChannel.postMessage(message);
		const result = schema.safeParse(message);

		setData(result);
	};

	broadcastChannel.onmessage = (event) => {
		const result = schema.safeParse(event.data);

		setData(result);
	};

	return {
		data,
		postMessage,
	};
}
