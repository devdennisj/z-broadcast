import type { ZodSchema } from "zod";


type ParseBroadcastReturn<T> = {
    success: boolean;
    data: T;
    error?: string;
};


function parseBroadcast<T>(schema: Partial<ZodSchema>, data: T) {
    const safeParse = schema?.safeParse;
    if (!schema) {
        console.error("No schema provided");

        return
    }

    if (!safeParse) {
        console.error("safeParse does not exist on the provided schema");

        return
    }

    const parsedSchema = safeParse(data);

    const returnObj: ParseBroadcastReturn<T> = {
        success: parsedSchema.success,
        data: parsedSchema.data,
        error: parsedSchema.error?.message,
    };

    return returnObj
}

export default parseBroadcast;
