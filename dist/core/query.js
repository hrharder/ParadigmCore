"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function queryWrapper(state) {
    return (request) => {
        console.log(`\nQUERY REQUEST:\n\n${JSON.stringify(request)}`);
        return {};
    };
}
exports.queryWrapper = queryWrapper;
