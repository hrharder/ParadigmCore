// request/response schemas
import * as api from "./api.json";

/**
 * ## Class: `JsonRequest`
 * 
 * JSON-RPC 2.0 compliant implementation of the Stream API.
 * 
 * A work in progress as of 06 Februrary 2019
 * 
 * https://www.jsonrpc.org/specification
 */
export class JsonRequest {
    /**
     * Stream API definition JSON.
     */
    private static api: IStreamAPI = api;

    /**
     * Error code for parsing failures.
     */
    public static PARSE:       string = "-32700";
    
    /**
     * Error code for general bad requests.
     */
    public static REQUEST:     string = "-32600";
    
    /**
     * Error code for bad method in request.
     */
    public static METHOD:      string = "-32601";

    /**
     * Error code for parsing failures.
     */
    public static PARAM:       string = "-32602";

    /**
     * Any non-specific internally caught error.
     */
    public static INTERNAL:    string = "-32603"; 

    /**
     * Raw input string, deleted after parsing.
     */
    private raw:    string;

    /**
     * Parsed request object.
     */
    private parsed: IParsedRequest;

    /**
     * Array of any validation errors encountered.
     */
    private errs:   ValidationError[];

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
        this.errs = [];
        this.valid = null; // null until set by `validate()` 
    }

    /**
     * Generate valid JSON object only will necessary params.
     */
    public toJSON(): object {
        const { jsonrpc, id, method, params } = this.parsed;
        return { jsonrpc, id, method, params };
    }

    /**
     * Trigger validation steps.
     * 
     * @todo expand doc of this function.
     */
    public validate(): ValidationError[] {
        // shortcut to request property definitions
        const reqDef = JsonRequest.api.request;

        // check valid json by parsing
        try {
            const { jsonrpc, id, method, params } = JSON.parse(this.raw);
            this.parsed = { jsonrpc, id, method, params };
            this.raw = undefined;
        } catch (err) {
            this.addValErr("PARSE", err.message);
            return this.errs;
        }

        for (let i = 0; i < reqDef.properties.length; i++){
            this.validateRequestProperties(reqDef.properties[i]);
        }

        this.close(this.errs);
        return this.errs;
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
            this.close(this.errs);
        }

        // validate properties
        if (typeof req[key] !== type) {
            this.addValErr("REQUEST", `incorrect type for '${key}' option.`);
            this.close(this.errs);
        }
        
        // validate top-level request
        if (req[key] && regExp && !arr) {
            this.validateExpParam(key, regExp, code, info);
        } else if (req[key] && !regExp && arr) {
            this.validateOptionParam(arr, req[key])
        } else if (req[key] && !regExp && !arr) {
            if (typeof req[key] === "object" && key === "params") {
                this.validateMethodParams();
            }
        } else {
            this.addValErr("REQUEST", `malformed parameters.`);
            this.close(this.errs);
        }
    }

    /**
     * Not implemented yet.
     * 
     * @param method 
     * @param params 
     */
    public validateMethodParams(method?: string, params?: IParam) {
        console.log(`Number of methods: ${Object.keys(this.parsed.params).length}`);
    }

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
    public validateOptionParam(options: string[], query: string) {
        if (options.indexOf(query) !== 0) {
            this.addValErr("PARAM", `invalid option '${query}'.`);
        } else {
            return;
        }
    }

    /**
     * Add a newly detected validation error to the array of detected errors.
     * 
     * @param code error code of detected validation error
     * @param msg the additional validation error log
     */
    public addValErr(code: string, msg?: string) {
        if (this.valid === false || this.valid === true) return;
        const suffix = msg ? msg : "";
        const info = `${api.codes[code].info}${suffix}`;
        this.errs.push({ code, info });
        return;
    }

    /**
     * Finish a validation and set the result to prevent future testing. 
     * 
     * @param errs the final set of validation errors
     */
    public close(errs: ValidationError[]): any {
        if (errs.length > 0) {
            this.valid = false;
        } else {
            this.valid = true;
        }
        return errs;
    }
}