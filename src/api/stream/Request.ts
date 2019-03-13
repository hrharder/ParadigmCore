/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name Request.ts
 * @module api/stream
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  05-February-2019
 * @date (modified) 13-March-2018
**/

// request/response schemas
import * as errors from "./errors.json";
import * as schema from "./schema.json";

// third party
import * as _ from "lodash";

/**
 * JSON-RPC 2.0 compliant implementation of the Stream API request messages.
 *
 * A work in progress as of 06 Feb. 2019
 *
 * See: https://www.jsonrpc.org/specification
 */
export class Request {
    /**
     * Stream API definition JSON.
     */
    private static schema: IStreamSchema = schema;

    /**
     * Top-level definitions for JSONRPC request/responses.
     */
    private static errors: IErrors = errors;

    /**
     * Parsed request object.
     */
    public parsed: IParsedRequest;

    /**
     * Raw input string, deleted after parsing.
     */
    private raw: string;

    /**
     * The first validation error encountered, if any.
     */
    private err: ValidationError;

    /**
     * Set to true or false depending on result of `JsonRequest.prototype.
     * validate()`, and set to `null` beforehand.
     */
    private valid: boolean;

    /**
     * Create a new JSONRPC request instance.
     *
     * @param input raw input JSONRPC request string.
     */
    constructor(input: any) {
        this.raw = input;
        this.err = null;
        this.valid = null; // null until set by `validate()`
    }

    /**
     * Generate valid JSON object only will necessary params.
     */
    public toJSON(): IParsedRequest {
        const { jsonrpc, id, method, params } = this.parsed;
        return { jsonrpc, id, method, params };
    }

    /**
     * Trigger validation steps.
     *
     * @todo expand doc of this function.
     */
    public validate(): ValidationError {
        // return immediately if already validated
        if (this.valid !== null) { return; }

        // check valid json by parsing
        try {
            const rawString = this.raw.toString();
            const { jsonrpc, id, method, params } = JSON.parse(rawString);
            this.parsed = { jsonrpc, id, method, params };
            this.raw = undefined;
        } catch (err) {
            this.addValErr(-32700, err.message); // parse error code
        }

        try {
            const { methods } = Request.schema;
            const { method, params, id } = this.parsed;

            if (
                _.isUndefined(method) ||
                _.isUndefined(params) ||
                _.isUndefined(id)
            ) {
                this.addValErr(-32600, "check for missing fields.");
            } else if (_.isUndefined(methods[method])) {
                this.addValErr(-32601, "invalid method, please check request.");
            } else if (methods[method].params) {
                const { required, properties} = methods[method].params;
                // iterate over required params and check
                for (let name of required) {
                    this.validateRequiredParam(properties[name], params[name], name);
                }
            }
        } catch (error) {
            this.addValErr(-32603);
        }

        // return validation error (if any)
        if (this.valid === null) { this.close(); }
        return this.err;
    }

    /**
     * @todo document
     */
    private validateRequiredParam(def: ISchemaProperty, param: any, name: string) {
        if (!param) {
            this.addValErr(-32602, "missing required parameter");
        } else if (!def) {
            this.addValErr(-32603, "missing definition (todo)");
        }

        try {
            if (typeof param !== def.type) {
                this.addValErr(-32602, `incorrect type of param '${name}'`);
            } else if (def.enum && def.enum.indexOf(param) === -1) {
                this.addValErr(-32602, `invalid option for param '${name}'`);
            }
        } catch (error) {
            this.addValErr(-32603);
        }
        return;
    }

    /**
     * Add a newly detected validation error to the array of detected errors.
     *
     * @param key error code key of detected validation error
     * @param msg the additional validation error log
     */
    private addValErr(code: number, msg?: string) {
        if (this.valid !== null) { return; }
        const suffix = msg ? msg : "";
        const message = `${Request.errors[code].info}${suffix}`;
        this.close({ code, message });
        return;
    }

    /**
     * Finish a validation and set the result to prevent future testing.
     *
     * @param errs the final set of validation errors
     */
    private close(err?: ValidationError): any {
        if (err !== undefined && err !== null) {
            this.valid = false;
            this.err = err;
        } else {
            this.err = null;
            this.valid = true;
        }
        return;
    }
}
