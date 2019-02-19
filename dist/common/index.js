"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zlib = require("zlib");
function decodeTx(tx) {
    let inBuff;
    let dcBuff;
    let outStr;
    try {
        inBuff = Buffer.from(Buffer.from(tx, "base64").toString("utf8"), "base64");
        dcBuff = zlib.inflateSync(inBuff);
        outStr = dcBuff.toString("utf8");
    }
    catch (error) {
        throw Error(`Failed to decode TX: ${error.message}`);
    }
    return outStr;
}
exports.decodeTx = decodeTx;
