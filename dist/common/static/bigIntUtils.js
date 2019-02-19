"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bigIntReplacer(key, value) {
    if (typeof (value) === "bigint") {
        return `${value.toString()}n`;
    }
    else {
        return value;
    }
}
exports.bigIntReplacer = bigIntReplacer;
