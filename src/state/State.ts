/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name State.ts
 * @module state
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  11-March-2019
 * @date (modified) 12-March-2019
*/

// STDLIB and 3rd party imports
import { createHash, Hash } from "crypto";
import { clone, isBuffer, isString } from "lodash";
import { readFile, writeFile } from "fs";

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

    private _path: URL;

    /**
     * Create a new `State` object instance. 
     * 
     * Initializes a null (genesis) state object. The hash of a null state (the
     * `AppHash`) will always be the same.
     * 
     * @param path the (absolute) path to write state contents to disk with
     */
    constructor(path?: string, fileName?: string) {
        // parse absolute file path
        this._path = new URL(`file://${path || process.cwd()}/${fileName || "state.json"}`);

        // null out round number
        this.round = {
            number: null,
            startsAt: null,
            endsAt: null,
            limit: null,
            limitUsed: null
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
        this.orderCounter = null;
        this.lastBlockHeight = null;
        this.lastBlockAppHash = Buffer.alloc(0);
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

    // BEGIN STATE TRANSITION FUNCTIONS

    /**
     * Applies state transition for an `order` transaction.
     * 
     * @param poster the Ethereum address of the relevant poster account
     */
    public applyOrderTx(poster: string): void {
        try {
            this.posters[poster].limit -= 1;
            this.orderCounter += 1;
            this.round.limitUsed += 1;
        } catch (e) {
            throw Error(`Transition failed: ${e.message}`);
        }
    }

    /**
     * Applies state transition for a `rebalance` transaction.
     * 
     * @param proposal the rebalance proposal to apply (already accepted)
     */
    public applyRebalanceTx(proposal: RebalanceData): void {
        try {
            // set round parameters
            this.round.number += 1;
            this.round.limitUsed = 0;
            this.round.startsAt = proposal.round.startsAt;
            this.round.endsAt = proposal.round.endsAt;
            this.round.limit = proposal.round.limit;

            // update poster limits
            for (let account in proposal.limits) {
                this.posters[account].limit = proposal.limits[account];
            }
        } catch (e) {
            throw Error(`Transition failed: ${e.message}`);
        }
    }

    public applyWitnessTx(): void {}

    // END STATE TRANSITION METHODS

    /**
     * Reads the contents of the file path specified upon construction from disk,
     * and loads its contents into state, over-writing any and all current data.
     * 
     * Handles parsing the custom-stringified data kept in the JSON file.
     * 
     * The actual process of reading the file from disk is handled by the 
     * internal `internalReadFile` method.
     */
    public async readFromDisk(): Promise<void> {
        try {
            const data = await new Promise(this.internalReadFile());
            const parsed = JSON.parse(data.toString(), (k, v) => {
                if (k === "lastBlockAppHash") {
                    console.log(v);
                    return Buffer.from(v);
                } else if (isString(v) && /^(\d*)n$/.test(v)) {
                    console.log(v);
                    return BigInt(v.slice(0, -1));
                } else {
                    return v;
                }
            });
            Object.keys(this).forEach((key) => {
                if (key.charAt(0) !== "_") {
                    this[key] = parsed[key];
                }
            });
        } catch (e) {
            throw Error(`Failed to read state file: ${e.message}`);
        }
    }

    /**
     * Writes the contents of state to the file path specified upon construction.
     * 
     * Handles generation of a custom-stringified data to be kept in the JSON
     * file, which is necessary due to the currently un-serializable `bigint`.
     * 
     * The actual process of writing the file to disk is handled by the 
     * internal `internalWriteFile` method.
     */
    public async writeToDisk() {
        const strData = JSON.stringify(this.toJSON(), (k, v) => {
            if (typeof v === "bigint") {
                return v.toString().concat("n");
            } else if (k === "lastBlockAppHash") {
                return v.data;
            } else {
                return v;
            }
        });
        await new Promise(this.internalWriteFile(strData));
    }

    /**
     * Returns a promise executor that wraps the async `fs.readFile` method.
     */
    private internalReadFile(): (res, rej) => void {
        return (resolve, reject) => {
            readFile(this._path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }
    }

    /**
     * Returns a promise executor that wraps the async `fs.writeFile` method.
     */
    private internalWriteFile(data: string): (res, rej) => void {
        return (resolve, reject) => {
            writeFile(this._path, data, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }
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
            case "undefined": return this.updateHashUndefined(hash);
            case "function": return;
            case "symbol": return;
            default: {
                throw Error(`Invalid type: don't know how to hash ${type}`);
            }
        }
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
    private updateHashUndefined(hash: Hash) {
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
     * Should not be used for serialization –  don't call `JSON.stringify(state)`
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