/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name deliverTx.ts
 * @module src/core
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  21-January-2019
 * @date (modified) 22-January-2019
 *
 * ABCI deliverTx implementation.
*/

// custom typings
import { ResponseDeliverTx } from "../typings/abci";

// util functions
import { Vote } from "./util/Vote";
import { warn } from "../common/log";
import { decodeTx, preVerifyTx } from "./util/utils";

// tx handlers
import { deliverOrder } from "./handlers/order";
import { deliverStream } from "./handlers/stream";
import { deliverWitness } from "./handlers/witness";
import { deliverRebalance } from "./handlers/rebalance";

/**
 * Execute a transaction in full: perform state modification, and verify
 * transaction validity.
 *
 * @param request {object} raw transaction as delivered by Tendermint core.
 */
export function deliverTxWrapper(
    state: State,
    msg: LogTemplates,
    Order: any
): (r) => ResponseDeliverTx {
    return (request) => {
        // load transaction from request
        const rawTx: Buffer = request.tx;   // Encoded/compressed tx object
        let tx: SignedTransaction;          // Decoded tx object

        // decode the buffered and compressed transaction
        try {
            tx = decodeTx(rawTx);
        } catch (error) {
            warn("state", msg.abci.errors.decompress);
            return Vote.invalid(msg.abci.errors.decompress);
        }

        // verify the transaction came from a validator
        if (!preVerifyTx(tx, state)) {
            warn("state", msg.abci.messages.badSig);
            return Vote.invalid(msg.abci.messages.badSig);
        }

        // select the proper handler verification logic based on the tx type.
        switch (tx.type) {
            // sumbmission of an 'order' tx (external)
            case "order": {
                return deliverOrder(tx as SignedOrderTx, state, Order);
            }

            // sumbmission of a 'stream' tx (external)
            // @TODO implement
            case "stream": {
                return deliverStream(tx as SignedStreamTx, state);
            }

            // validator reporting witness to Ethereum event (internal)
            case "witness": {
                return deliverWitness(tx as SignedWitnessTx, state);
            }

            // rebalance transaction updates poster allocation (internal)
            case "rebalance": {
                return deliverRebalance(tx as SignedRebalanceTx, state);
            }

            // invalid/unknown transaction type
            default: {
                warn("state", msg.abci.errors.txType);
                return Vote.invalid(msg.abci.errors.txType);
            }
        }
    };
}