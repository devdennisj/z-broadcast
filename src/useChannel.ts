import { useState } from "react";
import type { UseBroadcastOptions } from "./App";
import type {
	BroadcastReturn,
	ParseDataOptions,
	ParsedBroadcast,
} from "./types";

const parseData = ({ schema, data }: ParseDataOptions) => {
	const parsed = schema.safeParse(data);

	if (parsed.success) {
		return parsed;
	}

	return { error: parsed.error, success: false, data: undefined };
};

export default function useChannel<T>({
	name,
	schema,
}: UseBroadcastOptions): BroadcastReturn<T> {
	const broadcastChannel = new BroadcastChannel(name);

	const [data, setData] = useState<ParsedBroadcast<T>>({
		success: false,
		data: undefined,
		error: undefined,
	});

	broadcastChannel.onmessage = (event) => {
		const result = parseData({ schema, data: event.data });

		setData(result);
	};

	return {
		...data,
		postMessage: broadcastChannel.postMessage,
	};
}
