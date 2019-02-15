import { EventEmitter } from "events";
import { TxGenerator } from "src/core/util/TxGenerator";
import { TxBroadcaster } from "src/core/util/TxBroadcaster";
import { Witness } from "src/witness/Witness";

/**
 * Configuration options for main ParadigmCore state machine.
 */
interface ParadigmCoreOptions {
    version:            string;
    //tracker:            OrderTracker;
    witness:            Witness;
    deliverState:       State;
    commitState:        State;
    abciServPort:       number;
    txGenerator:        TxGenerator;    
    finalityThreshold:  number;
    maxOrderBytes:      number;
    periodLength:       number;
    periodLimit:        number;
    paradigm:           any;
}

// RESPONSE TYPES

/**
 * ABCI response to info()
 */
interface ResponseInfo {
    data: string;
    lastBlockAppHash: Buffer;
    lastBlockHeight: number;
    version: string;
}

/**
 * ABCI response to initChain() - currently null
 */
interface ResponseInitChain {}

/**
 * ABCI response to beginBlock() - currently null
 */
interface ResponseBeginBlock {}

/**
 * Interface that defines the generic tx response type.
 */
interface ResponseTx {
    code?: number;
    log: string;
    tags?: KVPair;
}

/**
 * ABCI response to checkTx() - a vote
 */
interface ResponseCheckTx extends ResponseTx {}

/**
 * ABCI response to deliverTx() - a vote
 */
interface ResponseDeliverTx extends ResponseTx {}

/**
 * ABCI response to endBlock(), includes validator updates
 */
interface ResponseEndBlock {
    validatorUpdates?:   ValidatorUpdate[];
}

/**
 * ABCI response to commit() - inclues state hash
 */
interface ResponseCommit {
    data: string | Buffer;
}

// END RESPONSE TYPES

// SUPPORTING TYPES BELOW

interface ValidatorUpdate {
    pubKey: PubKey;
    power: number;
}

interface PubKey {
    type: string;
    data: Buffer;
}

interface ParsedWitnessData {
    subject:    string;
    amount:     bigint;
    block:      number;
    address:    string;
    publicKey:  string | null;
    id?:        string;
}

