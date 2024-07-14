import { useState } from "react";
import type {
	ChannelReturn,
	SafeParseData,
	UseBroadcastOptions,
} from "./types";

export default function useChannel<T>({
	name,
	schema,
}: UseBroadcastOptions): ChannelReturn<T> {
	const broadcastChannel = new BroadcastChannel(name);

	const [data, setData] = useState<SafeParseData<T> | undefined>(undefined);

	broadcastChannel.onmessage = (event) => {
		const result = schema.safeParse(event.data);

		setData(result);
	};

	return {
		data,
		postMessage: (message: unknown) => {
			broadcastChannel.postMessage(message);
			const result = schema.safeParse(message);

			setData(result);
		},
	};
}
