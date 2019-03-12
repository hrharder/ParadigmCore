/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name info.ts
 * @module core
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  21-January-2019
 * @date (modified) 12-March-2019
 *
 * ABCI info implementation.
*/

// custom typings
import { ResponseInfo } from "../typings/abci";
import { State } from "src/state/State";

/**
 * Return information about the state and software.
 *
 * @param request {RequestInfo}    info request
 */
export function infoWrapper(state: State, version: string): (r) => ResponseInfo {
    return (request) => {
        state.readFromDisk().catch(e => {
            console.log("failed to read from disk");
        });
        return {
            data: "ParadigmCore (alpha)",
            lastBlockAppHash: state.lastBlockAppHash,
            lastBlockHeight: state.lastBlockHeight,
            version,
        };
    };
}