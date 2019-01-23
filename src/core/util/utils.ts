/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name utils.ts
 * @module src/core/util
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  04-December-2018
 * @date (modified) 22-January-2019
 *
 * ParadigmCore state machine (ABCI) utility functions – pure and non state-
 * modifying.
 */

// ParadigmCore classes
import { PayloadCipher } from "../../crypto/PayloadCipher";
import { err, log, warn } from "../../util/log";

// ParadigmCore types
import { ParsedWitnessData } from "src/typings/abci";

// Other
import { cloneDeep, isInteger } from "lodash";
import { createHash } from "crypto";
import { Verify } from "ed25519";

/**
 * Verify validator signature, and confirm transaction originated from an
 * active validator.
 *
 * @param tx    {SignedTransaction} signed transaction object (decoded)
 * @param state {State}             current state
 */
export function preVerifyTx(tx: SignedTransaction, state: State): boolean {
    // result of verification
    let isValid: boolean;

    // attempt to verify
    try {
        const msg = Buffer.from(JSON.stringify(tx.data), "utf8");
        const sig = Buffer.from(tx.proof.signature, "hex");
        const pub = Buffer.from(tx.proof.from, "hex");

        // verify message
        isValid = Verify(msg, sig, pub);

        // verify computed id matches reported "fromAddr"
        const idRaw = createHash("sha256").update(pub).digest("hex").slice(0, 40);
        if (idRaw !== tx.proof.fromAddr) return false;
    } catch (error) {
        return false;
    }

    // check that signing party is an active validator
    if (!state.validators.hasOwnProperty(tx.proof.fromAddr)) {
        return false;
    }

    // if above conditions pass mean tx is from active validator
    return isValid;
}

/**
 * Clones the 'source' state into the 'target' state.
 * @todo expand, add additional checks
 *
 * @param source {State} the state to copy FROM
 * @param target {State} the state to copy TO
 */
export function syncStates(source: State, target: State): void {
    Object.keys(source).forEach((key) => {
        if (typeof source[key] !== "object") {
            target[key] = source[key].valueOf();
        } else {
            target[key] = cloneDeep(source[key]);
        }
    });
}

/**
 * Decode and decompress input transaction. Wrapper for PayloadCipher class.
 * 
 * @todo implement logic directly in this function
 *
 * @param raw {Buffer} encoded/compressed raw transaction
 */
export function decodeTx(raw: Buffer): SignedTransaction {
    return PayloadCipher.ABCIdecode(raw);
}

/**
 * Compute the witness confirmation threshold based on number of active
 * validators.
 *
 * @param active {number} number of active validators (or initial)
 */
export function computeConf(active: number): number {
    if (active === 1 || active === 0) {
        return 1;
    } else if (active > 1) {
        return Math.floor(2 * (active / 3));
    } else {
        err("state", "unexpected case.");
        return 1;
    }
}

/**
 * Compute and apply the value of 2/3 the active validators as the required 
 * confirmation threshold for pending events. Essentially a wrapper (that 
 * applies transition) of `computeConf()`.
 * 
 * @param state {State} current network state object
 * @param last {Array} array of 'lastVotes' (from RequestBeginBlock) 
 */
export function stateUpdateConfThreshold(state: State, last: object[]): void {
    state.consensusParams.confirmationThreshold = computeConf(last.length);
}

/**
 * Verify an order conforms to max size requirement.
 *
 * @param order {paradigm.Order} paradigm order object
 *
 * @todo make size parameter an in-state parameter
 */
export function verifyOrder(order: any, state: State): boolean {
    // Convert order => string => buffer and count bytes
    let orderBuf: Buffer = Buffer.from(JSON.stringify(order), "utf8");
    let maxSize: number = state.consensusParams.maxOrderBytes;

    // Constrain to max size
    return (orderBuf.length <= maxSize);
}

/**
 * Generates a rate-limit mapping based on staked balances and the total order
 * limit per staking period, from in-state object.
 *
 * @param posters   {object} current in-state poster balances/limits
 * @param limit     {number} the total number of orders accepted in the period
 */
export function genLimits(posters: PosterInfo, limit: number): Limits {
    let total: bigint = BigInt(0);      // Total amount currently staked
    const output: Limits = {};          // Generated output mapping

    // Calculate total balance currently staked
    Object.keys(posters).forEach((k, v) => {
        if (posters.hasOwnProperty(k)) {
            total += posters[k].balance;
        }
    });

    // Compute the rate-limits for each staker based on stake size
    Object.keys(posters).forEach((k, v) => {
        if (posters.hasOwnProperty(k)) {
            // Compute proportional order limit
            const bal = posters[k].balance;
            const lim = (bal / total) * BigInt(limit);

            // Create limit object for each address
            output[k] = {
                // orderLimit is proportional to stake size
                orderLimit: parseInt(lim.toString(), 10),

                // streamLimit is always 1, regardless of stake size
                streamLimit: 1,
            };
        }
    });

    // Return constructed output mapping.
    return output;
}

/**
 * Apply event state transition of balances.
 *
 * @param state     {object}    current state object
 * @param staker    {string}    staker's address
 * @param amount    {number}    amount staked (or unstaked)
 * @param type      {string}    event type (add or remove)
 */
export function applyEvent(
    state: State,
    address: string,
    amount: bigint,
    type: string,
    block: number
): void {
    switch (type) {
        // Staker is adding stake
        case "add": {
            if (block <= state.lastEvent.add) return; 
            state.posters[address].balance += amount;
            break;
        }

        // Staker is removing stake
        case "remove": {
            if (block <= state.lastEvent.remove) return;
            state.posters[address].balance -= amount;
            break;
        }

        // Unknown event type
        default: { return; }
    }

    // Return upon completion of updates
    return;
}

/**
 * Update state upon event confirmation
 *
 * @param state     {object}    current state object
 * @param staker    {string}    staker's address
 * @param block     {number}    relevant block height
 * @param amount    {number}    amount staked (or unstaked)
 * @param type      {string}    event type (stake made or removed)
 */
export function updateMappings(
    state: State,
    id: string,
    address: string,
    block: number,
    amount: bigint,
    type: string
) {
    if (
        state.events.hasOwnProperty(block) &&
        state.events[block].hasOwnProperty(id) &&
        state.events[block][id].type === type &&
        state.events[block][id].amount === amount
    ) {
        // Is this event now confirmed?
        if (state.events[block][id].conf >=
            state.consensusParams.confirmationThreshold
        ) {
            log("state", "witness event confirmed, updating balances");

            // if this is a new account, add to state
            if (!state.posters.hasOwnProperty(address)) {
                state.posters[address] = {
                    balance: 0n,
                    orderLimit: null,
                    streamLimit: null
                };
            }

            // apply event to state (add confirmation, new event, etc.)
            applyEvent(state, address, amount, type, block);

            // Remove events that were just applied to state
            delete state.events[block][id];

            // Remove event block entry if empty
            if (Object.keys(state.events[block]).length === 0) {
                delete state.events[block];
            }

            // Remove balance entry if now empty
            if (state.posters[address].balance === BigInt(0)) {
                delete state.posters[address];
            }

            // Update highest event block accepted
            if (state.lastEvent[type] < block) {
                state.lastEvent[type] = block;
            }

            // Done
            return;
        } else {
            // Witness account added, but event is not confirmed yet
            log("state", "confirmation added for pending witness event");
            return;
        }
    } else {
        // Event in state does not match event TX
        warn("state", "disagreement about event data, potential failure");
        return;
    }
}

/**
 * Parses and validates a `witness` transaction from a validator's witness
 * module.
 * 
 * @param data raw witness event transaction (from Witness module)
 */
export function parseWitness(data: WitnessData): ParsedWitnessData {
    // raw vals
    const { subject, type, block, amount, publicKey, address, id } = data;

    // parsed vals
    let intAmount, parsedAddress, parsedPublicKey;

    // validate subject is validator or poster
    if (subject !== "validator" && subject !== "poster") {
        throw new Error("invlalid witness subject");
    }

    // validate state operation
    if (type !== "add" && type !== "remove") {
        throw new Error("invalid witness state operation");
    }

    // ensure block is integer number
    if (!isInteger(block)) {
        throw new Error("invalid target block");
    }

    // ensure amount is a bigint
    // TODO: figure out this check
    intAmount = BigInt(amount);
    // if (amount.slice(-1) === "n") {
    //     intAmount = BigInt(amount.slice(0, -1));
    // } else {
    //     throw new Error("expected amount to be bigint");
    // }

    // ensure address is valid eth address and remove checksum
    const buffAddr = Buffer.from(address.slice(2), "hex");
    if (buffAddr.length === 20) {
        parsedAddress = `0x${buffAddr.toString("hex")}`;
    } else {
        throw new Error("invalid target account address");
    }

    // validate publicKey if this is validator subject
    if (subject === "poster" && publicKey === null) {
        // all good
        parsedPublicKey = null;
    } else if (subject === "poster" && publicKey !== null) {
        throw new Error("expected no publicKey for poster witnesses");
    } else if (subject === "validator" && publicKey === null) {
        throw new Error("expected publicKey for validator witnesses");
    } else if (subject === "validator" && publicKey !== null) {
        const pubKeyBuff = Buffer.from(publicKey, "base64");
        if (pubKeyBuff.length !== 32) throw new Error("bad validator pubKey");
        parsedPublicKey = pubKeyBuff.toString("base64");
    }

    // valid if this point reached
    return {
        subject,
        type,
        block,
        amount: intAmount,
        address: parsedAddress,
        publicKey: parsedPublicKey,
        id
    }
}

/**
 * Add a new witness event to state, or add confirmation to existing
 * @todo: move logic from witness.ts to here
 * 
 * @param state current state object
 * @param tx 
 */
export function addNewEventOrCheckExists(state: State, tx: ParsedWitnessData) {
    const { subject, type, amount, block, address, publicKey } = tx;

    // if (state.events.hasOwnProperty(block))
}

/**
 * Creates a hash of a witness event, for validation inside state machine
 * 
 * @param tx a raw witness transaction
 */
export function createWitnessEventHash(tx: WitnessData): string {
    const hashVals =
        `${tx.subject}-${tx.type}-${tx.amount}-${tx.block}-` +
        `${tx.address}-${tx.publicKey === null ? "null" : tx.publicKey}`;
    
    // buffer input and create hash
    const hashBuffer = Buffer.from(hashVals);
    const hash = createHash("sha256").update(hashBuffer).digest("hex").slice(16);

    // return hash as ID for witness event tx's
    return hash;
}

/**
 * Creates a witness tx object from raw input data.
 * 
 * @param subject state modification subject (validator or poster)
 * @param type state modification type (add or remove)
 * @param amount amount of tokens (added or removed) to modify by
 * @param block the block number (ethereum) of the event
 * @param address ethereum address of the relevant party
 * @param publicKey tendermint public key (only for validator witness tx's)
 */
export function createWitnessEventObject(
    subject: string,
    type: string,
    amount: string,
    block: number,
    address: string,
    publicKey?: string
): WitnessData {
    // should never occur where subject is validator and key is blank
    if (subject === "validator" && publicKey === undefined) {
        throw new Error("expected publicKey for validator witness event");
    }

    // will store returned event
    let outputEvent: WitnessData;

    // check if poster or validator
    switch (subject) {
        case "poster": {
            outputEvent = {
                subject,
                type,
                amount,
                block,
                address,
                publicKey: null
            }
            break;
        }
        case "validator": {
            outputEvent = {
                subject,
                type,
                amount,
                block,
                address,
                publicKey
            }
            break;
        }
        default: { return; }
    }

    // compute and add eventId to witness event
    const eventId = createWitnessEventHash(outputEvent);
    outputEvent["id"] = eventId;

    // return parsed and completed event object
    return outputEvent;
}