import { useState } from "react";
import type { ZodError, ZodSchema } from "zod";

export const createChannel = (channelName: string, callbackFn: (message: Event) => void) => {
    const channel = new BroadcastChannel(channelName);

    channel.addEventListener(`${channelName}1`, callbackFn);

    return channel;
};

export interface UseBroadcastOptions {
    name: string;
    schema: ZodSchema;
}

export type ParseBroadcastReturn<T> = {
    success?: boolean;
    data: T | undefined;
    error?: ZodError<unknown>;
};

const callbackFn = (message: Event) => {
    try {
        // const { name } = schema.parse(message.data);
        console.log("cb", message);

    } catch (_) {
        console.error('Invalid broadcasting data');
    }
}

// Optimistic option? defaults success to true

function useBroadcast<T>({ name, schema, optimistic }: UseBroadcastOptions) {
    if (!name) {
        throw new Error("No name provided");
    }

    if (!schema) {
        throw new Error("No schema provided");
    }

    const safeParse = schema.safeParse;

    if (!safeParse) {
        throw new Error("safeParse does not exist on the provided schema");
    }

    const channel = createChannel(name, callbackFn);
    const [data, setData] = useState<ParseBroadcastReturn<T> | undefined>({
        success: Boolean(optimistic),
        data: undefined,
        error: undefined,
    });

    const postData = (data: T) => {
        const parsed = safeParse(data);
        const success = parsed.success;

        if (success) {
            channel.postMessage(data);
            setData(parsed);
        }

        return success;
    }

    return {
        postData,
        data
    }
}

export default useBroadcast;
