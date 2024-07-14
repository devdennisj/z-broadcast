import { useState } from "react";
import type { z } from "zod";
import type { SafeParseData, UseBroadcastOptions } from "./types";

export default function useChannel<T>({
	name,
	schema,
}: UseBroadcastOptions<T>) {
	const [data, setData] = useState<SafeParseData<T> | undefined>(undefined);

	const broadcastChannel = new BroadcastChannel(name);

	broadcastChannel.onmessage = (event) => {
		const result = schema.safeParse(event.data);

		setData(result);
	};

	const postMessage = (message: z.infer<typeof schema>) => {
		broadcastChannel.postMessage(message);
		const result = schema.safeParse(message);

		setData(result);
	};

	return {
		data,
		postMessage,
	};
}
