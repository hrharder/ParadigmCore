"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function queryWrapper(state) {
    return (request) => {
        let code, log, info, index, key, value, proof, height, codespace;
        const { data, path, height: reqHeight, prove, } = request;
        return {
            code: 0,
            info: "Successful query.",
            key: Buffer.from("lastBlockHeight"),
            value: Buffer.from(state.lastBlockHeight.toString())
        };
    };
}
exports.queryWrapper = queryWrapper;
