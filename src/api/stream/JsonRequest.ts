// request/response schemas
import * as api from "./api.json";
import { StreamServer } from "./StreamServer.js";

//todo: move to api.json
const
    PARSE =      "-32700",
    REQUEST =    "-32600",
    METHOD =     "-32600",
    PARAM =      "-32600",
    INTERNAL =   "-32600";

/**
* JSON-RPC 2.0
 * 
 * https://www.jsonrpc.org/specification
 */
export class JsonRequest {

    // accepted params
    private static api: IStreamAPI = api;

    // raw and parsed input
    private raw: string;
    private parsed: IParsedRequest;

    // validation errors (if any)
    private errs: ValidationError[];
    private valid: boolean;

    private result: ValidationError[];

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
        // err codes (todo: move to api.json)
        const PARSE =      "-32700";
        const REQUEST =    "-32600";
        const METHOD =     "-32600";
        const PARAM =      "-32600";
        const INTERNAL =   "-32600";

        // check valid json by parsing
        try {
            this.parsed = JSON.parse(this.raw);
        } catch (err) {
            this.addValErr(PARSE, err.message);
            return this.errs;
        }
        
        // destructure required input properties
        const {
            jsonrpc:    jsonrpcI,
            id:         idI,
            method:     methodI,
            params:     paramsI
        } = this.parsed;

        JsonRequest.api.request.properties.forEach(prop => {
            // destructure values
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
                this.addValErr(REQUEST, `incorrect type for '${key}' option.`);
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
                this.addValErr(REQUEST, `malformed parameters.`);
                this.close(this.errs);
            }
        });

        return this.errs;
    }

    public validateRequest(prop: IRequestProperty) {}

    public validateMethodParams(method?: string, params?: IParam) {
        console.log(`will validate method params here`);
    }

    public validateExpParam(key: string, rgxp: string, code: string, log: string) {
        const req = this.parsed;
        const regexp = new RegExp(rgxp);
        console.log(key, rgxp, code, log);
        if (!regexp.test(req[key])) {
            console.log(`Test failed for param ${key}`);
            this.addValErr(code, log);
        }
        return;
    }
    
    public validateOptionParam(options: string[], query: string) {
        if (options.indexOf(query) !== 0) {
            this.addValErr(PARAM, `invalid option '${query}'.`);
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
        }
        this.valid = true;
        return errs;
    }
}