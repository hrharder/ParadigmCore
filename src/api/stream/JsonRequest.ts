/**
* JSON-RPC 2.0
 * 
 * https://www.jsonrpc.org/specification
 */
export class JsonRequest {

    // accepted params
    private static methods = [
        "subscribe",
    ];

    // version: always 2.0 for JSON RPC v2
    private jsonrpc: string = "2.0";

    // method: for now, "subscribe only"
    private method: string;

    // params: ordered array of params
    private params: string[];

    // id: if the first request, any id, if subsequent specific ID
    private id: string;

    constructor(input: string) {
        const parsed = JSON.parse(input);

        // check for missing params, too long, etc
        // ... eventually will be more helpful validation
        if (
            Object.keys(parsed).length !== 4 ||
            parsed.jsonrpc !== "2.0" ||
            !parsed.method || typeof parsed.method !== "string" ||
            !parsed.params || typeof parsed.params !== "object" ||
            !parsed.id || typeof parsed.id !== "string"
        ) {
            throw new Error("Invalid: missing, incorrect or extra parameters.");
        }

        // assign validated params
        this.method = parsed.method;
        this.params = parsed.params;
        this.id = parsed.id;
    }

    public toJSON(): object {
        const { jsonrpc, method, params, id } = this;
        return { jsonrpc, method, params, id };
    }
}