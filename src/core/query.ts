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
 * @todo parse path, support multiple query paths and options, util functions 
 * for buffering req/res objects
 *
 * @param request {RequestInfo}    info request
 */
export function queryWrapper(state: State): (r) => ResponseQuery {
    return (request) => {
        // return values (all possible) for `ResponseQuery`
        let code, log, info, index, key, value, proof, height, codespace;

        // destructure query request params
        const {
            data,
            path,
            height: reqHeight,
            prove,
        } = request;

        // temporarily return minimum viable query response
        return {
            code: 0,
            info: "Successful query.",
            key: Buffer.from("lastBlockHeight"),
            value: Buffer.from(state.lastBlockHeight.toString())
        };
    }
}