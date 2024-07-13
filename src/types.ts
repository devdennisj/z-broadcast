import type { ZodError, ZodSchema } from "zod";

export interface UseBroadcastOptions {
    name: string;
    schema: ZodSchema;
}

export interface ParsedBroadcast<T> {
    success?: boolean;
    data: T | undefined;
    error?: ZodError<unknown>;
}

export type BroadCastPostMessage = Pick<BroadcastChannel, "postMessage">;

export interface BroadcastReturn<T> extends ParsedBroadcast<T>, BroadCastPostMessage { }
