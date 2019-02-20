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
export class JsonRequest {
    /**
     * Stream API definition JSON.
     */
    private static schema: IStreamSchema = schema;

    /**
     * Top-level definitions for JSONRPC request/responses.
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
        if (this.valid !== null) return;
        // shortcut to request property definitions
        const reqDef = JsonRequest.api.request;

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
            const { methods } = JsonRequest.schema;
            const { method, params, id } = this.parsed;

            if (
                _.isUndefined(method) ||
                _.isUndefined(params) ||
                _.isUndefined(id)
            ) {
                this.addValErr(-32600, "check for missing fields.");
            } else if (_.isUndefined(methods[method])) {
                this.addValErr(-32601, "invalid method, please check request.");
            } else {
                const { required, properties} = methods[method].params; 
                // iterate over required params and check
                for (let i = 0; i < required.length; i++) {
                    const name = required[i];
                    this.validateRequiredParam(properties[name], params[name], name);
                }
            }
        } catch (error) {
            console.log("error: " + error);
            this.addValErr(-32603);
        }
        
        /* todo remove
        try {
            // check request based on JSON definition
            for (let i = 0; i < reqDef.properties.length; i++){
                this.validateRequestProperties(reqDef.properties[i]);
            }
        } catch (err) {
            this.addValErr(-32603);
        }*/

        // return validation error (if any)
        if (this.valid === null) { this.close(); }
        return this.err;
    }

    private validateRequiredParam(def: ISchemaProperty, param: any, name: string) {
        if (!param) {
            this.addValErr(-32602, "missing required parameter");
        } else if (!def) {
            console.log("no def :(");
            this.addValErr(-32603);
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
     * Not implemented yet.
     * 
     * @param prop 
     */
    private validateRequestProperties(prop: IRequestProperty): void {
        // destructure values from property definitions
        const {
            key,
            required,
            type,
            valRegEx:   regExp,
            valArr:     arr,
            errInfo:    info, 
        } = prop;

        const code = parseInt(prop.errCode);
        const req = this.parsed;

        // check for missing requirements
        if (required && !req[key]) {
            this.addValErr(code, `missing required '${key}' field.`);
            return;
        }

        // validate properties
        if (typeof req[key] !== type) {
            this.addValErr(code, `incorrect type for '${key}' option.`);
            return;
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
    private validateExpParam(key: string, rgxp: string, code: number, log: string) {
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
    private validateOptionParam(code: number, options: string[], query: string) {
        if (options.indexOf(query) === -1) {
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
    private addValErr(code: number, msg?: string) {
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