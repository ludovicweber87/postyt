export type InstanceError = {
    response: {
        data: {
            message: Array<string>;
            error: string;
            statusCode: number;
        }
    }
}
