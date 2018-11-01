/**
  =========================
  ParadigmCore: Blind Star
  main.ts @ {master}
  =========================

  @date_initial 13 September 2018
  @date_modified 1 November 2018
  @author Henry Harder

  Main ParadigmCore state machine and state transition logic.
*/

// Tendermint JS ABCI server 
const abci: any = require('abci');

// Log message templates
import { messages as msg } from "../util/static/messages";

// Custom classes
import { PayloadCipher } from "../crypto/PayloadCipher";
import { Hasher } from "../crypto/Hasher";
import { Vote } from "./Vote"
import { Logger } from "../util/Logger";
import { OrderTracker } from "../async/OrderTracker";
import { StakeRebalancer } from "../async/StakeRebalancer";

// ABCI handler functions
import { checkOrder, deliverOrder } from "./handlers/order";
import { checkWitness, deliverWitness } from "./handlers/witness";
import { checkRebalance, deliverRebalance } from "./handlers/rebalance";
import { Transaction } from "./Transaction";

// "Globals"
let version: string;    // store current application version
let handlers: object;   // ABCI handler functions

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
        version = options.version;

        // Load state objects
        deliverState = options.deliverState;
        commitState = options.commitState;

        // Establish ABCI handler functions
        handlers = {
            info: info,
            beginBlock: beginBlock,
            checkTx: checkTx,
            deliverTx: deliverTx,
            commit: commit
        };

        // Queue for valid broadcast transactions (order/stream)
        tracker = new OrderTracker(options.emitter);

        // Configure StakeRebalancer module
        rebalancer = await StakeRebalancer.create({
          provider: options.provider,
          periodLength: options.periodLength,
          periodLimit: options.periodLimit,
          finalityThreshold: options.finalityThreshold,
          stakeAddress: options.stakeAddress,
          stakeABI: options.stakeABI,
          broadcaster: options.broadcaster
        });

        // Start ABCI server (connection to Tendermint core)
        await abci(handlers).listen(options.abciServPort);
        Logger.consensus(msg.abci.messages.servStart);

    } catch (err) {
        throw new Error('Error initializing ABCI application.');
    }
    return;
}

/**
 * Start rebalancer module and order tracker module.
 */
export async function startRebalancer(): Promise<null> {
  try {
      // Start rebalancer after sync
      let code = rebalancer.start(); // start listening to Ethereum event
      if (code !== 0) {
        Logger.rebalancerErr(`Failed to start rebalancer. Code ${code}`);
        throw new Error();
      }

      // Activate OrderTracker (after Tendermint sync)
      tracker.activate();
    } catch (err) {
        throw new Error("Error activating stake rebalancer.");
    }
    return;
}

/*
Below are implementations of Tendermint ABCI functions.
*/

/**
 * Return information about the state and software.
 * 
 * @param _ {null}
 */
function info(_): object {
    return {
        data: 'ParadigmCore ABCI Application',
        version: version,
        lastBlockHeight: commitState.lastBlockHeight,
        lastBlockAppHash: commitState.lastBlockAppHash
    }
}

/**
 * Called at the begining of each new block. Updates proposer and block height.
 * 
 * @param request {object} raw transaction as delivered by Tendermint core.
 */
function beginBlock(request): object {
    let currHeight = request.header.height;
    let currProposer = request.header.proposerAddress.toString('hex');

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
    let rawTx: Buffer = request.tx;

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

    // Verify validator signature
    // @TODO: add condition to check sig is from a validator
    try {
       sigOk = Transaction.verify(tx);
       if (!sigOk) {
           Logger.mempoolWarn("Rejected ABCI transaction with invalid signature.");
           return Vote.invalid("Invalid validator signature.");   
       }
    } catch (err) {
        Logger.mempoolWarn("Unable to recover validator signature.");
        return Vote.invalid("Error encountered recovering validator signature.");
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
            return checkWitness(tx, commitState);;
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
    let rawTx: Buffer = request.tx;

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

    // Verify validator signature
    // @TODO: add condition to check sig is from a validator
    try {
       sigOk = Transaction.verify(tx);
       if (!sigOk) {
           Logger.mempoolWarn("Rejected ABCI transaction with invalid signature.");
           return Vote.invalid("Invalid validator signature.");   
       }
    } catch (err) {
        Logger.mempoolWarn("Unable to recover validator signature.");
        return Vote.invalid("Error encountered recovering validator signature.");
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
            return deliverWitness(tx, deliverState);;
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

// TODO: implement endBlock()

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
        let roundDiff = deliverState.round.number - commitState.round.number;

        switch (roundDiff) {
            case 0: {
                // No rebalance proposal accepted in this round
                break;
            }

            case 1: {
                // Rebalance proposal accepted in this round

                // Load round parameters from state
                let newRound = deliverState.round.number;
                let newStart = deliverState.round.startsAt;
                let newEnd = deliverState.round.endsAt;

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
        // @TODO: find a better way to deep-clone the state object
        commitState = JSON.parse(JSON.stringify(deliverState));        
        Logger.consensus(
            `Commit and broadcast complete. Current state hash: ${stateHash}`);
    } catch (err) {
        Logger.consensusErr(msg.abci.errors.broadcast);
    }

    // Temporary
    console.log(`\n... Current state: ${JSON.stringify(commitState)}\n`);

    // Return state's hash to be included in next block header
    return stateHash;
}