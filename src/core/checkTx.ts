/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name checkTx.ts
 * @module src/core
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  21-January-2019
 * @date (modified) 22-January-2019
 *
 * ABCI checkTx implementation.
*/

// custom typings
import { ResponseCheckTx } from "../typings/abci";

// utils
import { warn } from "../common/log";
import { messages } from "../common/static/messages"
import { decodeTx, preVerifyTx, invalidTx } from "./util/utils";

// tx handlers
import { checkOrder } from "./handlers/order";
import { checkWitness } from "./handlers/witness";
import { checkRebalance } from "./handlers/rebalance";

/**
 * Perform light verification on incoming transactions, accept valid
 * transactions to the mempool, and reject invalid ones.
 * 
 * Currently, all transaction types are checked before mempool/gossip by:
 * - encoding according to spec/implementation of TxGenerator and TxBroadcaster
 * - zlib compression
 * - signature from an active validator
 * - transaction type specific rules
 *
 * @param request {object} raw transaction as delivered by Tendermint core.
 */
export function checkTxWrapper(state: State, Order: any): (r) => ResponseCheckTx {
    return (request) => {
        // load transaction from request
        const rawTx: Buffer = request.tx;   // Encoded/compressed tx object
        let tx: SignedTransaction;          // Decoded tx object

        // decode the buffered and compressed transaction
        try {
            tx = decodeTx(rawTx);
        } catch (error) {
            warn("mem", messages.abci.errors.decompress);
            return invalidTx(messages.abci.errors.decompress);
        }

        // verify the transaction came from a validator
        if (!preVerifyTx(tx, state)) {
            warn("mem", messages.abci.messages.badSig);
            return invalidTx(messages.abci.messages.badSig);
        }

        // select the proper handler verification logic based on the tx type
        switch (tx.type) {
            // sumbmission of an 'order' tx (external)
            case "order": {
                return checkOrder(tx as SignedOrderTx, state, Order);
            }

            // validator reporting witness to Ethereum event (internal)
            case "witness": {
                return checkWitness(tx as SignedWitnessTx, state);
            }

            // rebalance transaction updates poster allocation (internal)
            case "rebalance": {
                return checkRebalance(tx as SignedRebalanceTx, state);
            }

            // invalid/unknown transaction type
            default: {
                warn("mem", messages.abci.errors.txType);
                return invalidTx(messages.abci.errors.txType);
            }
        }
    };
}