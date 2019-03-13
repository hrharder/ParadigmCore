import { EventEmitter } from "events";
import { TxGenerator } from "src/core/util/TxGenerator";
import { Witness } from "src/witness/Witness";

/**
 * Configuration options for main ParadigmCore state machine.
 */
interface ParadigmCoreOptions {
    version:            string;
    witness:            Witness;
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
 * ABCI resposne to a submitTx request
 */
interface ResponseBroadcastTx {
    code: number;
    data: any;
    log: string;
    hash: string;
}

/**
 * ABCI response to initChain() - currently null
 */
interface ResponseInitChain {}

/**
 * ABCI response to query()
 */
interface ResponseQuery {}

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

interface ResponseQuery {
    code: number;
    log?: string;
    info?: string;
    key?: Buffer;
    value?: Buffer;
    proof?: any;
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

