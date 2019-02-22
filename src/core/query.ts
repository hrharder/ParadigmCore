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
 * ABCI info implementation.
*/

// custom typings
import { ResponseQuery } from "../typings/abci";

/**
 * Return information about the state and software.
 *
 * @param request {RequestInfo}    info request
 */
export function queryWrapper(state: State): (r) => ResponseQuery {
    return (request) => {
        console.log(`\nQUERY REQUEST:\n\n${JSON.stringify(request)}`);
        return {};
    }
}