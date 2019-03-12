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

// common imports
import { warn } from "../common/log";

// custom typings
import { State } from "src/state/State";
import { ResponseInfo } from "../typings/abci";

/**
 * Return information about the state and software.
 *
 * @param request {RequestInfo}    info request
 */
export function infoWrapper(state: State, version: string): (r) => Promise<ResponseInfo> {
    return async (request) => {
        try {
            await state.readFromDisk();
        } catch (error) {
            warn("api", "failed to load state from disk during info");
            warn("api", `provided error message: ${error.message}`);
        }
        return {
            data: "ParadigmCore (alpha)",
            lastBlockAppHash: state.lastBlockAppHash,
            lastBlockHeight: state.lastBlockHeight,
            version,
        };
    };
}
