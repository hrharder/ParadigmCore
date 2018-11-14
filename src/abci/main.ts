/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name main.ts
 * @module src/abci
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  15-October-2018
 * @date (modified) 13-November-2018
 *
 * Main ParadigmCore state machine implementation and state transition logic.
 */

// 3rd party and STDLIB imports
// tslint:disable-next-line:no-var-requires
const abci: any = require("abci");
import * as _ from "lodash";

// Log message templates
import { messages as msg } from "../util/static/messages";

// ParadigmCore classes
import { OrderTracker } from "../async/OrderTracker";
import { StakeRebalancer } from "../async/StakeRebalancer";
import { Hasher } from "../crypto/Hasher";
import { PayloadCipher } from "../crypto/PayloadCipher";
import { Logger } from "../util/Logger";
import { TransactionGenerator } from "./util/TransactionGenerator";
import { Vote } from "./util/Vote";

// ABCI handler functions
import { checkOrder, deliverOrder } from "./handlers/order";
import { checkRebalance, deliverRebalance } from "./handlers/rebalance";
import { checkWitness, deliverWitness } from "./handlers/witness";

// "Globals"
let version: string;    // store current application version
let handlers: object;   // ABCI handler functions
let generator: TransactionGenerator;    // Used to verify Tx's

// Asynchronous modules
let tracker: OrderTracker;          // Wsed to broadcast valid orders
let rebalancer: StakeRebalancer;    // Witness component

// State objects
let deliverState: any;  // deliverTx state
let commitState: any;   // commit state

/**
 * Initialize and start the ABCI application.
 *
 * @param options {object} Options object with parameters:
 *  - options.version       {string}        application version
 *  - options.emitter       {EventEmitter}  main event emitter object
 *  - options.deliverState  {object}        deliverTx state object
 *  - options.commitState   {object}        commit state object
 *  - options.abciServPort  {number}        local ABCI server port
 */
export async function startMain(options: any): Promise<null> {
    try {
        // Set application version
        version = options.version;

        // Load state objects
        deliverState = options.deliverState;
        commitState = options.commitState;

        // Establish ABCI handler functions
        handlers = {
            beginBlock,
            checkTx,
            commit,
            deliverTx,
            info,
        };

        // Queue for valid broadcast transactions (order/stream)
        tracker = new OrderTracker(options.emitter);

        // Transaction generator/verifyer
        generator = options.txGenerator;

        // Configure StakeRebalancer module
        rebalancer = await StakeRebalancer.create({
            broadcaster: options.broadcaster,
            finalityThreshold: options.finalityThreshold,
            periodLength: options.periodLength,
            periodLimit: options.periodLimit,
            provider: options.provider,
            stakeABI: options.stakeABI,
            stakeAddress: options.stakeAddress,
            txGenerator: options.txGenerator,
        });

        // Start ABCI server (connection to Tendermint core)
        await abci(handlers).listen(options.abciServPort);
        Logger.consensus(msg.abci.messages.servStart);

    } catch (err) {
        throw new Error("Error initializing ABCI application.");
    }
    return;
}

/**
 * Start rebalancer module and order tracker module.
 */
export async function startRebalancer(): Promise<null> {
    try {
        // Start rebalancer after sync
        const code = rebalancer.start(); // start listening to Ethereum event
        if (code !== 0) {
            Logger.rebalancerErr(`Failed to start rebalancer. Code ${code}`);
            throw new Error(code.toString());
        }

        // Activate OrderTracker (after Tendermint sync)
        tracker.activate();
    } catch (err) {
        throw new Error("Error activating stake rebalancer.");
    }
    return;
}

/*
Below are implementations of Tendermint ABCI handler functions.
*/

/**
 * Return information about the state and software.
 */
function info(): object {
    return {
        data: "ParadigmCore ABCI Application",
        lastBlockAppHash: commitState.lastBlockAppHash,
        lastBlockHeight: commitState.lastBlockHeight,
        version,
    };
}

/**
 * Called at the begining of each new block. Updates proposer and block height.
 *
 * @param request {object} raw transaction as delivered by Tendermint core.
 */
function beginBlock(request): object {
    // Parse height and proposer from header
    const currHeight: number = request.header.height.low; // @TODO: consider
    const currProposer: string = request.header.proposerAddress.toString("hex");

    // Store array of last votes
    const lastVotes: object[] | undefined = request.lastCommitInfo.votes;

    // Parse validators that voted on the last block
    if (lastVotes !== undefined && lastVotes.length > 0) {
        // Iterate over votes array (supplied by Tendermint)
        lastVotes.forEach((vote: any) => {
            const valHex = vote.validator.address.toString("hex");
            const valPower = vote.validator.power.low;  // @TODO re-examine

            // Create entry if validator has not voted yet
            if (!(deliverState.validators.hasOwnProperty(valHex))) {
                deliverState.validators[valHex] = {
                    lastProposed: null,
                    lastVoted: null,
                    totalVotes: 0,
                    votePower: null,
                };
            }

            // Update vote and height trackers
            deliverState.validators[valHex].totalVotes += 1;
            deliverState.validators[valHex].lastVoted = (currHeight - 1);

            // Record if they are proposer
            if (valHex === currProposer) {
                deliverState.validators[valHex].lastProposed = currHeight;
            }

            // Update (or re-record) validator vote power
            deliverState.validators[valHex].votePower = valPower;
        });
    }

    Logger.newRound(currHeight, currProposer);
    return {};
}

/**
 * Perform light verification on incoming transactions, accept valid
 * transactions to the mempool, and reject invalid ones.
 *
 * @param request {object} raw transaction as delivered by Tendermint core.
 */
function checkTx(request): Vote {
    // Raw transaction buffer (encoded and compressed)
    const rawTx: Buffer = request.tx;

    let tx: any;        // Stores decoded transaction object
    let txType: string; // Stores transaction type
    let sigOk: boolean; // True if signature is valid

    // Decode the buffered and compressed transaction
    try {
        tx = PayloadCipher.ABCIdecode(rawTx);
        txType = tx.type.toLowerCase();
    } catch (err) {
        Logger.mempoolWarn(msg.abci.errors.decompress);
        return Vote.invalid(msg.abci.errors.decompress);
    }

    /*
      Verify validator signature. Currently, then validation condition depends
      on weather or not the signature matches the reported origin of the
      ABCI transaction. In the future, the condition will check the above AND
      that the validator's address is in the current validator set.
    */
    try {
        sigOk = generator.verify(tx);
        if (!sigOk) {
            // Invalid validator signature
            Logger.mempoolWarn(msg.abci.messages.badSig);
            return Vote.invalid(msg.abci.messages.badSig);
        }
    } catch (err) {
        // Error recovering signature
        Logger.mempoolWarn(msg.abci.errors.signature);
        return Vote.invalid(msg.abci.errors.signature);
    }

    /**
     * This main switch block selects the propper handler logic
     * based on the transaction type.
     */
    switch (txType) {
        case "order": {
            return checkOrder(tx, commitState);
        }
        /*
        case "stream": {
            return checkStream(tx, commitState);
        }*/

        case "witness": {
            return checkWitness(tx, commitState);
        }

        case "rebalance": {
            return checkRebalance(tx, commitState);
        }

        default: {
            // Invalid transaction type
            Logger.mempoolWarn(msg.abci.errors.txType);
            return Vote.invalid(msg.abci.errors.txType);
        }
    }
}

/**
 * Execute a transaction in full: perform state modification, and verify
 * transaction validity.
 *
 * @param request {object} raw transaction as delivered by Tendermint core.
 */
function deliverTx(request): Vote {
    // Raw transaction buffer (encoded and compressed)
    const rawTx: Buffer = request.tx;

    let tx: any;        // Stores decoded transaction object
    let txType: string; // Stores transaction type
    let sigOk: boolean; // True if signature is valid

    // Decode the buffered and compressed transaction
    try {
        tx = PayloadCipher.ABCIdecode(rawTx);
        txType = tx.type.toLowerCase();
    } catch (err) {
        Logger.mempoolWarn(msg.abci.errors.decompress);
        return Vote.invalid(msg.abci.errors.decompress);
    }

    /*
      Verify validator signature. Currently, then validation condition depends
      on weather or not the signature matches the reported origin of the
      ABCI transaction. In the future, the condition will check the above AND
      that the validator's address is in the current validator set.
    */
    try {
       sigOk = generator.verify(tx);
       if (!sigOk) {
           // Invalid validator signature
           Logger.mempoolWarn(msg.abci.messages.badSig);
           return Vote.invalid(msg.abci.messages.badSig);
       }
    } catch (err) {
        // Error recovering signature
        Logger.mempoolWarn(msg.abci.errors.signature);
        return Vote.invalid(msg.abci.errors.signature);
    }

    /**
     * This main switch block selects the propper handler logic
     * based on the transaction type.
     */
    switch (txType) {
        case "order": {
            return deliverOrder(tx, deliverState, tracker);
        }
        /*
        case "stream": {
            return deliverStream(tx, deliverState, tracker);
        }*/

        case "witness": {
            return deliverWitness(tx, deliverState);
        }

        case "rebalance": {
            return deliverRebalance(tx, deliverState, rebalancer);
        }

        default: {
            // Invalid transaction type
            Logger.consensusWarn(msg.abci.errors.txType);
            return Vote.invalid(msg.abci.errors.txType);
        }
    }
}

/**
 * Persist application state, synchronize commit and deliver states, and
 * trigger the broadcast of valid orders in that block.
 *
 * @param request {object} raw transaction as delivered by Tendermint core.
 */
function commit(request): string {
    let stateHash: string = "";

    try {
        // Calculate difference between cState and dState round height
        const roundDiff = deliverState.round.number - commitState.round.number;

        switch (roundDiff) {
            // No rebalance proposal accepted in this round
            case 0: { break; }

            // Rebalance proposal accepted in this round
            case 1: {
                // Load round parameters from state
                const newRound = deliverState.round.number;
                const newStart = deliverState.round.startsAt;
                const newEnd = deliverState.round.endsAt;

                // Synchronize staking period parameters
                rebalancer.synchronize(newRound, newStart, newEnd);
                break;
            }

            default: {
                // Commit state is more than 1 round ahead of deliver state
                Logger.consensusWarn(msg.abci.messages.roundDiff);
                break;
            }
        }

        // Increase last block height
        deliverState.lastBlockHeight += 1;

        // Generate new state hash and update
        stateHash = Hasher.hashState(deliverState);
        deliverState.lastBlockAppHash = stateHash;

        // Trigger broadcast of orders and streams
        tracker.triggerBroadcast();

        // Synchronize commit state from delivertx state
        commitState = _.cloneDeep(deliverState);

        Logger.consensus(
            `Commit and broadcast complete. Current state hash: ${stateHash}`);
    } catch (err) {
        Logger.consensusErr(msg.abci.errors.broadcast);
    }

    // Temporary
    // tslint:disable-next-line:no-console
    console.log(`\n... Current state: ${JSON.stringify(commitState)}\n`);

    // Return state's hash to be included in next block header
    return stateHash;
}
