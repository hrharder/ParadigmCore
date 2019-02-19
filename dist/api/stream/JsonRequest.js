"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("./api.json");
class JsonRequest {
    constructor(input) {
        this.raw = input;
        this.err = null;
        this.valid = null;
    }
    toJSON() {
        const { jsonrpc, id, method, params } = this.parsed;
        return { jsonrpc, id, method, params };
    }
    validate() {
        if (this.valid !== null)
            return;
        const reqDef = JsonRequest.api.request;
        try {
            const { jsonrpc, id, method, params } = JSON.parse(this.raw);
            this.parsed = { jsonrpc, id, method, params };
            this.raw = undefined;
        }
        catch (err) {
            this.addValErr("-32700", err.message);
        }
        try {
            for (let i = 0; i < reqDef.properties.length; i++) {
                this.validateRequestProperties(reqDef.properties[i]);
            }
        }
        catch (err) {
            this.addValErr("-32603");
        }
        if (this.valid === null) {
            this.close();
        }
        return this.err;
    }
    validateRequestProperties(prop) {
        const { key, required, type, valRegEx: regExp, valArr: arr, errCode: code, errInfo: info, } = prop;
        const req = this.parsed;
        if (required && !req[key]) {
            this.addValErr(code, `missing required '${key}' field.`);
            return;
        }
        if (typeof req[key] !== type) {
            this.addValErr(code, `incorrect type for '${key}' option.`);
            return;
        }
        if (req[key] && regExp && !arr) {
            this.validateExpParam(key, regExp, code, info);
        }
        else if (req[key] && !regExp && arr) {
            this.validateOptionParam(code, arr, req[key]);
        }
        else if (req[key] && !regExp && !arr) {
            if (typeof req[key] === "object" && key === "params") {
                this.validateMethodParams();
            }
        }
        else {
            this.addValErr(code, `malformed parameters.`);
        }
        return;
    }
    validateMethodParams(method, params) { }
    validateExpParam(key, rgxp, code, log) {
        const req = this.parsed;
        const regexp = new RegExp(rgxp);
        if (!regexp.test(req[key])) {
            this.addValErr(code, log);
        }
        return;
    }
    validateOptionParam(code, options, query) {
        if (options.indexOf(query) === -1) {
            this.addValErr(code, `invalid option '${query}'.`);
        }
        else {
            return;
        }
    }
    addValErr(code, msg) {
        if (this.valid !== null)
            return;
        const suffix = msg ? msg : "";
        const message = `${JsonRequest.api.codes[code].info}${suffix}`;
        this.close({ code, message });
        return;
    }
    close(err) {
        if (err !== undefined && err !== null) {
            this.valid = false;
            this.err = err;
        }
        else {
            this.err = null;
            this.valid = true;
        }
        return;
    }
}
JsonRequest.api = api;
exports.JsonRequest = JsonRequest;
