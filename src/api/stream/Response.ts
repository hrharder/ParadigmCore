/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name Response.ts
 * @module api/stream
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  18-February-2019
 * @date (modified) 24-February-2019
**/

/**
 * The `Response` class represents a JSONRPC server response. It includes safety
 * checks to ensure messages sent by the server conform to the JSONRPC-2.0 spec.
 * 
 * To construct a __valid__ response object, pass in an options object with an 
 * `id` and `result` field. The `id` should be the same as the string provided
 * by the client when the request was initially made.
 * 
 * To construct an __invalid__ (i.e. error) response object, only pass in the 
 * `error` field in the `options` object (to the constructor). The id will
 * automatically be filled in as `null` as per the JSONRPC 2.0 spec.
 * 
 * Also see https://www.jsonrpc.org/specification
 */
export class Response {

    /**
     * Static JSONRPC version string for v2
     * 
     * Included in all response messages, both error and non-error.
     */
    private static jsonrpc = "2.0";

    /**
     * The client-provided id string.
     * 
     * Should only be included in the constructor for __non-error__ responses.
     */
    private id: string = null;

    /**
     * Arbitrary result data included in response.
     * 
     * The result data should be able to be serialized as a JSON string.
     */
    private result: any = null;

    /**
     * Any validation (or process) errors.
     * 
     * The `error` option should only be included in the constructor for 
     * response messages that are the result of requests that encounter errors.
     */
    private error: ValidationError = null;

    /**
     * Create a new response object.
     * 
     * Only include `options.id` and `options.result` for requests that do not
     * illicit an error. 
     * 
     * Requests that result in errors (validation or otherwise) will result in 
     * response objects with an `id` field of `null` and have no `result`. Only
     * pass in `options.error` for error responses.
     * 
     * @param options response options object (see [[IResponseOptions]])
     */
    constructor(options: IResponseOptions) {
        // destructure fields from options object
        const { id, result, error } = options;
        
        // validate proper usage
        if (!error && !result) {
            throw Error("One of 'error' or 'result' must be provided.");
        } else if (error && result) {
            throw Error("Cannot accept both 'result' and 'error'.");
        } else if (!id && result) {
            throw Error("The 'id' field must be provided if no error.");
        }

        // set instance vars
        this.id = options.id || null;
        this.result = options.result || null;
        this.error = options.error || null;
    }

    /**
     * Enables serialization of `Response` objects.
     */
    public toJSON(): IJsonResponse {
        // base response object
        const res = {
            jsonrpc: Response.jsonrpc,
            id: this.id
        };

        if (this.result && !this.error) {
            return { ...res, result: this.result };
        } else if (!this.result && this.error) {
            return { ...res, error: this.error };
        }
    }
}