"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vote_1 = require("../util/Vote");
function checkStream(tx, state) {
    return Vote_1.Vote.invalid();
}
exports.checkStream = checkStream;
function deliverStream(tx, state) {
    return Vote_1.Vote.invalid();
}
exports.deliverStream = deliverStream;
