"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function queryWrapper(state) {
    return (request) => {
        const height = state.lastBlockHeight;
        let code, log, info, index, key, value, proof;
        const { data, path, height: reqHeight, prove, } = request;
        const pathTest = /^(posters|validators){1}\/(0x)[a-zA-Z0-9]{40}\/.*$/;
        if (!pathTest.test(path)) {
            code = 1;
            log = "Failed query: invalid query path.";
            info = "Currently query only accepts poster and validator queries.";
        }
        else {
            const [subject, account, filter] = path.split("/");
            info = path;
            const accountObject = state[subject][account];
            if (accountObject && accountObject[filter]) {
                code = 0;
                log = "Successful query.";
                const result = accountObject[filter].toString();
                key = Buffer.from(filter);
                value = Buffer.from(result);
            }
            else {
                code = 1;
                log = "Failed query: invalid account or filter.";
            }
        }
        return { code, info, log, key, value };
    };
}
exports.queryWrapper = queryWrapper;
