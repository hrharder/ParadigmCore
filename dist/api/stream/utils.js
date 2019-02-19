"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonRequest_1 = require("./JsonRequest");
const JsonResponse_1 = require("./JsonResponse");
const _ = require("lodash");
function validateMessage(message) {
    let res, req, error;
    req = new JsonRequest_1.JsonRequest(message);
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
    if (!result && error) {
        return new JsonResponse_1.JsonResponse({ error });
    }
    else if (result && id && !error) {
        return new JsonResponse_1.JsonResponse({ id, result });
    }
    else {
        throw Error("Invalid input for response generator.");
    }
}
exports.createResponse = createResponse;
