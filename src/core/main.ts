/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name main.ts
 * @module core
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  15-October-2018
 * @date (modified) 12-March-2019
 *
 * ParadigmCore primary state machine (via imported handlers) and ABCI
 * application.
*/

// 3rd party and STDLIB imports
const abci: any = require("abci");

// general utilities/classes/types
import { log } from "../common/log";
import { State } from "../state/State";
import { ParadigmCoreOptions } from "../typings/abci";
import { queryWrapper } from "./query";

// abci handler implementations
import { beginBlockWrapper } from "./beginBlock";
import { checkTxWrapper } from "./checkTx";
import { commitWrapper } from "./commit";
import { deliverTxWrapper } from "./deliverTx";
import { endBlockWrapper } from "./endBlock";
import { infoWrapper } from "./info";
import { initChainWrapper } from "./initChain";

/**
 * Initialize and start the ABCI application.
 *
 * @param options {object} Options object with parameters:
 *  - options.version       {string}        paradigmcore version string
 *  - options.abciServPort  {number}        local ABCI server port
 *  - options.finalityThreshold {number}    Ethereum block finality threshold
 *  - options.maxOrderBytes {number}        maximum order size in bytes
 *  - options.periodLength  {number}        length of rebalance period
 *  - options.periodLimit   {number}        transactions accepted per period
 *  - options.paradigm      {Paradigm}      paradigm-connect instance
 */
export async function start(options: ParadigmCoreOptions): Promise<null> {
    try {
        // Set application version
        let version = options.version;

        // Load paradigm Order constructor
        let Order = options.paradigm.Order;

        // Load state objects (performs initial write, if necessary)
        let dState = new State(true);  // deliverState is read-only
        let cState = new State(false); // only commit state can write to disk

        // Load initial consensus params
        let consensusParams: ConsensusParams = {
            finalityThreshold: options.finalityThreshold,
            periodLength: options.periodLength,
            periodLimit: options.periodLimit,
            maxOrderBytes: options.maxOrderBytes
        };

        // Establish ABCI handler functions
        let handlers = {
            // query, info, w/ state hash, height, version
            info: infoWrapper(cState, version),
            query: queryWrapper(cState),

            // called at genesis
            initChain: initChainWrapper(dState, cState, consensusParams),

            // mempool verification, pre-gossip
            checkTx: checkTxWrapper(cState, Order),

            // roundstep: [ beginBlock, deliverTx[, ...], endBlock, commit ]
            beginBlock: beginBlockWrapper(dState),
            deliverTx: deliverTxWrapper(dState, Order),
            endBlock: endBlockWrapper(dState),
            commit: commitWrapper(dState, cState),
        };

        // Start ABCI server (connection to Tendermint core)
        await abci(handlers).listen(options.abciServPort);
        log("state", `abci server connected on port ${options.abciServPort}`);
    } catch (error) {
        throw new Error(`initializing abci application: ${error.message}`);
    }
    return;
}
