"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("./Request");
const Response_1 = require("./Response");
const _ = require("lodash");
function validateMessage(message) {
    let res, req, error;
    req = new Request_1.Request(message);
    error = req.validate();
    return _.isNull(error) ? null : error;
}
exports.validateMessage = validateMessage;
function createValError(code, message) {
    if (!_.isNumber(code) || !_.isString(message)) {
        throw Error("Invalid types for validator error.");
    }
    return { code, message };
}
exports.createValError = createValError;
function createResponse(result, id, error) {
    let res;
    if (!result && error) {
        res = new Response_1.Response({ error });
    }
    else if (id && !error && result) {
        res = new Response_1.Response({ id, result });
    }
    else if (id && !error && !result) {
        res = new Response_1.Response({ id, result: {} });
    }
    else {
        throw Error("Invalid input for response generator.");
    }
    return res;
}
exports.createResponse = createResponse;
