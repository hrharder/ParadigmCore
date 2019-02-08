/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name JsonRequest.ts
 * @module src/api/stream
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  05-February-2019
 * @date (modified) 06-February-2018
 * 
 * TODO: fix this local version
**/

// request/response schemas
import * as api from "./api.json";

/**
 * JSON-RPC 2.0 compliant implementation of the Stream API request messages.
 * 
 * A work in progress as of 06 Feb. 2019
 * 
 * See: https://www.jsonrpc.org/specification
 */
export class JsonRequest {
    /**
     * Stream API definition JSON.
     */
    private static api: IStreamAPI = api;

    /**
     * Raw input string, deleted after parsing.
     */
    private raw:    string;

    /**
     * Parsed request object.
     */
    public parsed: IParsedRequest;

    /**
     * The first validation error encountered, if any.
     */
    private err:   ValidationError;

    /**
     * Set to true or false depending on result of `JsonRequest.prototype.
     * validate()`, and set to `null` beforehand.
     */
    private valid:  boolean;

    /**
     * Create a new JSONRPC request instance.
     * 
     * @param input raw input JSONRPC request string.
     */
    constructor(input: string) {
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
        if (this.valid !== null) return;
        // shortcut to request property definitions
        const reqDef = JsonRequest.api.request;

        // check valid json by parsing
        try {
            const { jsonrpc, id, method, params } = JSON.parse(this.raw);
            this.parsed = { jsonrpc, id, method, params };
            this.raw = undefined;
        } catch (err) {
            this.addValErr("-32700", err.message); // parse error code
        }

        try {
            // check request based on JSON definition
            for (let i = 0; i < reqDef.properties.length; i++){
                this.validateRequestProperties(reqDef.properties[i]);
            }
        } catch (err) {
            this.addValErr("-32603");
        }

        // return validation error (if any)
        if (this.valid === null) { this.close(); }
        return this.err;
    }

    /**
     * Not implemented yet.
     * 
     * @param prop 
     */
    public validateRequestProperties(prop: IRequestProperty): void {
        // destructure values from property definitions
        const {
            key,
            required,
            type,
            valRegEx:   regExp,
            valArr:     arr,
            errCode:    code,
            errInfo:    info, 
        } = prop;

        const req = this.parsed;

        // check for missing requirements
        if (required && !req[key]) {
            this.addValErr(code, `missing required '${key}' field.`);
        }

        // validate properties
        if (typeof req[key] !== type) {
            this.addValErr(code, `incorrect type for '${key}' option.`);
        }
        
        // validate top-level request
        if (req[key] && regExp && !arr) {
            this.validateExpParam(key, regExp, code, info);
        } else if (req[key] && !regExp && arr) {
            this.validateOptionParam(code, arr, req[key]);
        } else if (req[key] && !regExp && !arr) {
            if (typeof req[key] === "object" && key === "params") {
                this.validateMethodParams();
            }
        } else {
            this.addValErr(code, `malformed parameters.`);
        }
        return;
    }

    /**
     * Not implemented yet.
     * 
     * @param method 
     * @param params 
     */
    public validateMethodParams(method?: string, params?: IParam) {}

    /**
     * Validate params that can be validated via regular expression testing.
     * 
     * @param key target parameter key string
     * @param rgxp regex string to test against
     * @param code error code if param failure detected
     * @param log error log message if param failure
     */
    public validateExpParam(key: string, rgxp: string, code: string, log: string) {
        const req = this.parsed;
        const regexp = new RegExp(rgxp);
        if (!regexp.test(req[key])) {
            this.addValErr(code, log);
        }
        return;
    }

    /**
     * Validate a param where the possible values are contained within `options`.
     * 
     * @param options array of possible string values
     * @param query the string key included in the request
     */
    public validateOptionParam(code: string, options: string[], query: string) {
        if (options.indexOf(query) !== 0) {
            this.addValErr(code, `invalid option '${query}'.`);
        } else {
            return;
        }
    }

    /**
     * Add a newly detected validation error to the array of detected errors.
     * 
     * @param key error code key of detected validation error
     * @param msg the additional validation error log
     */
    public addValErr(code: string, msg?: string) {
        if (this.valid !== null) return;
        const suffix = msg ? msg : "";
        const message = `${JsonRequest.api.codes[code].info}${suffix}`;
        this.close({ code, message });
        return;
    }

    /**
     * Finish a validation and set the result to prevent future testing. 
     * 
     * @param errs the final set of validation errors
     */
    public close(err?: ValidationError): any {
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