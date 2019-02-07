export class JsonResponse {
    private id: string = null;
    private result: any = null;
    private error: any = null;

    constructor(options: IResponseOptions) {
        const { id, result, error } = options;
        
        if (!error && !result) {
            throw Error("One of 'error' or 'result' must be provided.");
        } else if (error && result) {
            throw Error("Cannot accept both 'result' and 'error'.");
        } else if (!id && result) {
            throw Error("The 'id' field must be provided if no error.");
        }

        this.id = options.id || null;
        this.result = options.result || undefined;
        this.error = options.error || undefined;
    }

    public toJSON() {
        const res = { jsonrpc: "2.0", id: this.id };
        if (this.result && !this.error) {
            return { ...res, result: this.result };
        } else if (!this.result && this.error) {
            return { ...res, error: this.error };
        }
    }
}