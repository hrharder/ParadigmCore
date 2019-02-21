"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("./api.json");
const schema = require("./schema.json");
const _ = require("lodash");
class Request {
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
        const reqDef = Request.api.request;
        try {
            const rawString = this.raw.toString();
            const { jsonrpc, id, method, params } = JSON.parse(rawString);
            this.parsed = { jsonrpc, id, method, params };
            this.raw = undefined;
        }
        catch (err) {
            this.addValErr(-32700, err.message);
        }
        try {
            const { methods } = Request.schema;
            const { method, params, id } = this.parsed;
            if (_.isUndefined(method) ||
                _.isUndefined(params) ||
                _.isUndefined(id)) {
                this.addValErr(-32600, "check for missing fields.");
            }
            else if (_.isUndefined(methods[method])) {
                this.addValErr(-32601, "invalid method, please check request.");
            }
            else if (methods[method].params) {
                const { required, properties } = methods[method].params;
                for (let i = 0; i < required.length; i++) {
                    const name = required[i];
                    this.validateRequiredParam(properties[name], params[name], name);
                }
            }
        }
        catch (error) {
            console.log("error: " + error);
            this.addValErr(-32603);
        }
        if (this.valid === null) {
            this.close();
        }
        return this.err;
    }
    validateRequiredParam(def, param, name) {
        if (!param) {
            this.addValErr(-32602, "missing required parameter");
        }
        else if (!def) {
            console.log("no def :(");
            this.addValErr(-32603);
        }
        try {
            if (typeof param !== def.type) {
                this.addValErr(-32602, `incorrect type of param '${name}'`);
            }
            else if (def.enum && def.enum.indexOf(param) === -1) {
                this.addValErr(-32602, `invalid option for param '${name}'`);
            }
        }
        catch (error) {
            this.addValErr(-32603);
        }
        return;
    }
    validateRequestProperties(prop) {
        const { key, required, type, valRegEx: regExp, valArr: arr, errInfo: info, } = prop;
        const code = parseInt(prop.errCode);
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
        const message = `${Request.api.codes[code].info}${suffix}`;
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
Request.schema = schema;
Request.api = api;
exports.Request = Request;
