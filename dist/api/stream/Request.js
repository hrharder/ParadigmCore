"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors = require("./errors.json");
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
    addValErr(code, msg) {
        if (this.valid !== null)
            return;
        const suffix = msg ? msg : "";
        const message = `${Request.errors[code].info}${suffix}`;
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
Request.errors = errors;
exports.Request = Request;
