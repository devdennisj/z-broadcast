import type { SafeParseReturnType, ZodSchema } from "zod";

export interface UseBroadcastOptions<T> {
	name: string;
	schema: ZodSchema<T>;
}

export type SafeParseData<T> = SafeParseReturnType<T, T>;
