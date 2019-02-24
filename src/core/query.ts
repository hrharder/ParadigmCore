/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name query.ts
 * @module core
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  21-February-2019
 * @date (modified) 21-February-2019
 *
 * ABCI query implementation.
*/

// custom typings
import { ResponseQuery } from "../typings/abci";

/**
 * Return information about the state and software.
 * 
 * THe `request.path` field is used to direct a query towards a particular state
 * object. Currently, query requests can return information about 
 * 
 * @todo parse path, support multiple query paths and options, util functions 
 * for buffering req/res objects
 *
 * @param request {RequestInfo}    info request
 */
export function queryWrapper(state: State): (r) => ResponseQuery {
    return (request) => {
        // the height at which the query is checked
        const height = state.lastBlockHeight;

        // return values (all possible) for `ResponseQuery`
        let code, log, info, index, key, value, proof;

        // destructure query request params
        // @todo leverage more of the possible RequestQuery params
        const { path } = request;

        // path tester regex
        // @todo improve and move
        const pathTest = /^(posters|validators){1}\/(0x)[a-zA-Z0-9]{40}\/.*$/;

        if (!pathTest.test(path)) {
            code = 1;
            log = "Failed query: invalid query path."
            info = "Currently query only accepts poster and validator queries."

            // construct ResponseQuery object
            return { code, log, info, height }
        }

        // split path
        const [ subject, account, filter] = path.split("/");

        // check state object for fields 
        const accountObject = state[subject][account];

        // check for account and filter
        if (accountObject && accountObject[filter]) {
            // encode result as string
            const result = accountObject[filter].toString();

            // set success status
            code = 0;
            log = "Successful query.";

            // buffer key and value for tags
            key = Buffer.from(filter);
            value = Buffer.from(result);

            // include string version of result
            info = result;

            // construct ResponseQuery object
            return { code, info, log, key, value, height};
        }

        // case for invalid request/missing account
        code = 1;
        log = "Failed query: invalid account or filter.";
        info = path;

        // construct ResponseQuery object
        return { code, info, log, height };
    }
}