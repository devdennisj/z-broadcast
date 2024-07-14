import type { SafeParseReturnType, ZodSchema } from "zod";

export interface UseBroadcastOptions<T> {
	id: string;
	schema: ZodSchema<T>;
}

export type SafeParseData<T> = SafeParseReturnType<T, T>;
