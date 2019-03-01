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

// for supporting query
import { get, isUndefined } from "lodash";

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
        
        // convert path to object traversal ('/' => '.')
        const dotPath = path.replace(/\//g, ".");

        // execute query using lodash get
        const result = get(state, dotPath, undefined);

        if (isUndefined(result)) {
            return {
                code: 1,
                log: "Failed query: invalid path."
            };
        }

        // include the original store-type in return message, and query path
        info = typeof result;
        log = `state/${path}`;
        code = 0;

        // stringify return value
        switch (info) {
            case "object": { 
                info = `[${Object.keys(result).toString()}]`;
                break;
            }
            case "number": {
                info = result.toString();
                break;
            }
            case "string": {
                info = result.toString();
                break;
            }
            case "bigint": {
                info = result.toString();
                break;
            }
            default: {
                code = 1;
                log = "Failed query: unsupported view.";
                info = null;
                break;
            }
        }

        return { code, log, info, key, value}
    }
}