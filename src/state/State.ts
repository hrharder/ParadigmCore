import { createHash, Hash } from "crypto";
import { clone, isBuffer } from "lodash";

/**
 * A class representing the OrderStream network state. 
 * 
 * Provides methods for hashing (generation of `AppHash` and Merkle root) and
 * various state transitions.
 */
export class State {
    public round: RoundInfo;
    public events: Events;
    public posters: PosterInfo;
    public validators: ValidatorInfo;
    public lastEvent: number;
    public consensusParams: ConsensusParams;
    public orderCounter: number;
    public lastBlockHeight: number;
    public lastBlockAppHash: Buffer;

    /**
     * Create a new `State` object instance. 
     * 
     * Initializes a null (genesis) state object. The hash of a null state (the
     * `AppHash`) will always be the same.
     */
    constructor() {
        // null out round number
        this.round = {
            number: 0,
            startsAt: 0,
            endsAt: 0,
            limit: 0,
            limitUsed: 0
        };

        // null out consensus params
        this.consensusParams = {
            finalityThreshold: null,
            periodLimit: null,
            periodLength: null,
            maxOrderBytes: null
        };

        // blank out other fields
        this.events = {};
        this.posters = {};
        this.validators = {};
        this.lastEvent = null;
        this.orderCounter = 0;
        this.lastBlockHeight = 0;
        this.lastBlockAppHash = Buffer.alloc(1);
    }

    /**
     * Overwrite all existing state values with those from the object passed in.
     *  
     * @param newState an existing full state object (meets [[IState]] interface)
     */
    public acceptNew(newState: IState) {
        this.round = newState.round;
        this.events = newState.events;
        this.posters = newState.posters;
        this.validators  = newState.validators;
        this.lastEvent = newState.lastEvent;
        this.consensusParams  = newState.consensusParams;
        this.orderCounter = newState.orderCounter;
        this.lastBlockHeight = newState.lastBlockHeight;
        this.lastBlockAppHash = newState.lastBlockAppHash;
    }

    /**
     * Generates a hash of all state values. Represents the `AppHash` and the
     * Merkle root of the `state` trie.
     * 
     * Does **not** modify the state of the object prototype.
     */
    public generateAppHash(): Buffer {
        const thisCopy: State = clone(this);
        const rawHash = createHash("sha256");
        
        // hash all values recursively of state copy
        this.updateHashObject(rawHash, thisCopy);

        // generate the hashed value
        const hash = rawHash.digest();
        return hash;
    }

    /* Begin internal hashing methods */

    /**
     * Selects the correct method of serialization to binary data for a given 
     * type to be included in a `Hash` object.
     * 
     * @param hash the hash object to update with a given value
     * @param value the value to include in the provided hash
     */
    private updateHashValue(hash: Hash, value: any): void {
        const type = typeof value;
        switch (type) {
            case "bigint": return this.updateHashNumber(hash, value as any);
            case "boolean": return this.updateHashBoolean(hash, value as any);
            case "number": return this.updateHashNumber(hash, value as any);
            case "object": return this.updateHashObject(hash, value as any);
            case "string": return this.updateHashString(hash, value as any);
            case "undefined": return this.updateHashUndefined(hash, value as any);
            case "function": return;
            case "symbol": return;
            default: {
                throw Error(`Invalid type: don't know how to hash ${type}`);
            }
        }
    }

    /**
     * Iterates over an objects enumerable properties and defers to the correct
     * logic for generating a hash of all the object's values.
     * 
     * @param hash the hash object being operated on
     * @param obj the object whose properties should be included in a hash
     */
    private updateHashObject(hash: Hash, obj: object): void {
        for (let key in obj) {
            const value = obj[key];
            if (isBuffer(value)) {
                hash.update(value);
            } else {
                this.updateHashValue(hash, value);
            }         
        }
        return;
    }

    /**
     * Converts a string to a `Buffer` object to update a hash object with.
     * 
     * @param hash the hash being operated on
     * @param string a string to include in the hash
     */
    private updateHashString(hash: Hash, string: string): void {
        const stringBuffer = Buffer.from(string);
        hash.update(stringBuffer);
    }

    /**
     * Converts a number value (either `bigint` or `number` type) to a
     * hexadecimal string value to be included in the hash.
     * 
     * @param hash the hash being operated on
     * @param number a number value (`bigint` or `number`) to include
     */
    private updateHashNumber(hash: Hash, number: number | bigint): void {
        const hexNumberString = number.toString(16);
        this.updateHashString(hash, hexNumberString);
        return ;
    }

    /**
     * Defines a manner to hash null or 0 values. For `null`, `undefined` or
     * 0 (including `false`) values, simply append a `00` byte to the binary
     * has input (prior to digestion).
     * 
     * @param hash the hash being operated on
     * @param nullVal a null or 0 value to include in the hash
     */
    private updateHashUndefined(hash: Hash, nullVal: undefined | null) {
        const zeroedBuffer = Buffer.from("00", "hex");
        hash.update(zeroedBuffer);
        return;
    }

    /**
     * Defines a method of hashing a boolean value. Values that are `true` are
     * included as a `ff` byte in the raw hash input, and `false` values are 
     * included as a `00` byte. Both appended prior to digestion.
     * 
     * @param hash the hash being operated on
     * @param bool a boolean value ot include in the hash
     */
    private updateHashBoolean(hash: Hash, bool: boolean): void {
        if (bool) {
            hash.update(Buffer.from("ff", "hex"));
        } else {
            hash.update(Buffer.from("00", "hex"));
        }
        return;
    }

    /* End internal hashing methods */

    /**
     * Convert state object to plain object (without method definitions).
     * 
     * Should not be used for serialization – don't call `JSON.stringify(state)`
     * as it is non-deterministic.
     */
    public toJSON(): IState {
        return {
            round: this.round,
            events: this.events,
            posters: this.posters,
            validators: this.validators,
            lastEvent: this.lastEvent,
            consensusParams: this.consensusParams,
            orderCounter: this.orderCounter,
            lastBlockHeight: this.lastBlockHeight,
            lastBlockAppHash: this.lastBlockAppHash,
        }
    }
}