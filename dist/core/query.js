"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function queryWrapper(state) {
    return (request) => {
        const height = state.lastBlockHeight;
        let code, log, info, index, key, value, proof;
        const { path } = request;
        const pathTest = /^(posters|validators){1}\/(0x)[a-zA-Z0-9]{40}\/.*$/;
        if (!pathTest.test(path)) {
            code = 1;
            log = "Failed query: invalid query path.";
            info = "Currently query only accepts poster and validator queries.";
            return { code, log, info, height };
        }
        const [subject, account, filter] = path.split("/");
        const accountObject = state[subject][account];
        if (accountObject && accountObject[filter]) {
            const result = accountObject[filter].toString();
            code = 0;
            log = "Successful query.";
            key = Buffer.from(filter);
            value = Buffer.from(result);
            info = result;
            return { code, info, log, key, value, height };
        }
        code = 1;
        log = "Failed query: invalid account or filter.";
        info = path;
        return { code, info, log, height };
    };
}
exports.queryWrapper = queryWrapper;
