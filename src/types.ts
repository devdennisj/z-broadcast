import type { SafeParseReturnType, ZodSchema } from "zod";

export interface UseBroadcastOptions {
	name: string;
	schema: ZodSchema;
}

export type BroadCastPostMessage = Pick<BroadcastChannel, "postMessage">;

export type SafeParseData<T> = SafeParseReturnType<T, T>;

export interface ChannelReturn<T> extends BroadCastPostMessage {
	data: SafeParseReturnType<T, T> | undefined;
}
