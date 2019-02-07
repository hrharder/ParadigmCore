// request/response schemas
import * as api from "./api.json";

/**
* JSON-RPC 2.0
 * 
 * https://www.jsonrpc.org/specification
 */
export class JsonRequest {
    // accepted params
    private static api: IStreamAPI = api;

    // error codes
    public static PARSE:       string = "-32700";     
    public static REQUEST:     string = "-32600"; 
    public static METHOD:      string = "-32601";
    public static PARAM:       string = "-32602"; 
    public static INTERNAL:    string = "-32603"; 

    // raw and parsed input
    private raw:    string;
    private parsed: IParsedRequest;

    // validation errors (if any)
    private errs:   ValidationError[];
    private valid:  boolean;

    constructor(input: string) {
        this.raw = input;
        this.errs = [];
        this.valid = null; // null until set by `validate()` 
    }

    public toJSON(): object {
        const { jsonrpc, id, method, params } = this.parsed;
        return { jsonrpc, id, method, params };
    }

    public validate(): ValidationError[] {
        // check valid json by parsing
        try {
            const { jsonrpc, id, method, params } = JSON.parse(this.raw);
            this.parsed = { jsonrpc, id, method, params };
            delete this.raw;
        } catch (err) {
            this.addValErr(JsonRequest.PARSE, err.message);
            return this.errs;
        }

        JsonRequest.api.request.properties.forEach(prop => {
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
                this.addValErr(JsonRequest.REQUEST, `incorrect type for '${key}' option.`);
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
                this.addValErr(JsonRequest.REQUEST, `malformed parameters.`);
                this.close(this.errs);
            }
        });
        this.close(this.errs);
        return this.errs;
    }

    public validateRequest(prop: IRequestProperty) {}

    public validateMethodParams(method?: string, params?: IParam) {
        console.log(`Number of methods: ${Object.keys(this.parsed.params).length}`);
    }

    public validateExpParam(key: string, rgxp: string, code: string, log: string) {
        const req = this.parsed;
        const regexp = new RegExp(rgxp);
        if (!regexp.test(req[key])) {
            this.addValErr(code, log);
        }
        return;
    }
    
    public validateOptionParam(options: string[], query: string) {
        if (options.indexOf(query) !== 0) {
            this.addValErr(JsonRequest.PARAM, `invalid option '${query}'.`);
        } else {
            return;
        }
    }

    public addValErr(code: string, msg?: string) {
        if (this.valid === false || this.valid === true) return;
        const suffix = msg ? msg : "";
        const info = `${api.codes[code]}${suffix}`;
        this.errs.push({ code, info });
        return;
    }

    public close(errs: ValidationError[]): any {
        if (errs.length > 0) {
            this.valid = false;
        } else {
            this.valid = true;
        }
        return errs;
    }
}