import { useState } from "react";
import type { UseBroadcastOptions } from "./App";
import type { BroadcastReturn, ParsedBroadcast } from "./types";

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
        ...data,
        postMessage: broadcastChannel.postMessage,
    };
}
