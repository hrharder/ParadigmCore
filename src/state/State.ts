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
import { readdir, readFile, writeFile } from "fs";
import { clone, cloneDeep, isBuffer, isString } from "lodash";
import * as hashObject from "object-hash";

/**
 * A class representing the OrderStream network state.
 *
 * Provides methods for hashing (generation of `AppHash` and Merkle root) and
 * various state transitions.
 */
export class State {
    /**
     * The `round` object tracks rebalance round information. It is used to
     * maintain sync with the Ethereum chain, which is used to mark the
     * beginning and end of each rebalance round.
     */
    public round: RoundInfo;

    /**
     * Pending witness attestations (delivered via `witness` transactions) are
     * stored here while they await confirmation by sufficient validators
     * submitting attestations to the same event. Indexed by block, then by
     * a hash of the event data, you can read more about the [[Events]] interface.
     */
    public events: Events;

    /**
     * The `posters` object is where poster accounts are created, updated, and
     * stored. Each poster with registered stake in the `PosterRegistry` contract
     * system has an account object that follows the [[Poster]] interface.
     */
    public posters: PosterInfo;

    /**
     * Validator information is kept in the `validators` object, where each
     * validator has an account. Contained within each [[Validator]] is their
     * public key, Ethereum address, staked balance, and other fields.
     */
    public validators: ValidatorInfo;

    /**
     * The `lastEvent` is updated each time an Ethereum event is accepted, and
     * is used to prevent acceptance of historical events that the state has
     * already been updated with.
     */
    public lastEvent: number;

    /**
     * A variety of consensus-critical parameters are stored in the
     * `consensusParams` mapping. Keep in mind that the app-state consensus
     * parameters (this object) is separate from the Tendermint-specific
     * consensus parameters, such as `MaxBlockSize`.
     */
    public consensusParams: ConsensusParams;

    /**
     * Incrementally counts the number of orders accepted by the network since
     * genesis. The `orderCounter` is incremented by 1 each time a valid `order`
     * transaction is accepted during consensus (in `DeliverTx`).
     */
    public orderCounter: number;

    /**
     * The last Tendermint block height at which a successful commit occurred.
     */
    public lastBlockHeight: number;

    /**
     * The `AppHash` of the previous commit.
     */
    public lastBlockAppHash: Buffer;

    // NON-STATE RELATED PARAMETERS BELOW

    /**
     * The (absolute) file path to read to and write from.
     */
    private _path: URL;

    /**
     * If set to true, the `State` instance will ONLY read, and will refuse to
     * write to disk.
     *
     * Useful when managing many state instances, with only one that should be
     * committed to disk with each block.
     */
    private _readOnly: boolean;

    /**
     * Create a new `State` object instance.
     *
     * Initializes a null (genesis) state object. The hash of a null state (the
     * `AppHash`) will always be the same.
     *
     * @param path the (absolute) path to write state contents to disk with
     */
    constructor(readOnly: boolean, path?: string, name?: string) {
        // parse absolute file path
        const filePath = path || process.cwd();
        const fileName = name || "state.json";

        // set file path and write permissions
        this._path = new URL(`file://${filePath}/${fileName}`);
        this._readOnly = readOnly;

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
        this.lastBlockAppHash = null;

        // after setting genesis state, read from disk if file present
        // check if file exists and load contents if it does
        readdir(filePath, (_, files) => {
            if (files.includes(fileName)) {
                this.readFromDisk();
            } else {
                this.writeToDisk();
            }
        });
    }

    /**
     * Overwrite all existing state values with those from the object passed in.
     *
     * @param newState an existing full state object (meets [[IState]] interface)
     */
    public acceptNew(newState: IState) {
        this.round = cloneDeep(newState.round);
        this.events = cloneDeep(newState.events);
        this.posters = cloneDeep(newState.posters);
        this.validators  = cloneDeep(newState.validators);
        this.lastEvent = clone(newState.lastEvent);
        this.consensusParams  = cloneDeep(newState.consensusParams);
        this.orderCounter = clone(newState.orderCounter);
        this.lastBlockHeight = clone(newState.lastBlockHeight);
        this.lastBlockAppHash = clone(newState.lastBlockAppHash);
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
                if (proposal.limits.hasOwnProperty(account)) {
                    this.posters[account].limit = proposal.limits[account];
                }
            }
        } catch (e) {
            throw Error(`Transition failed: ${e.message}`);
        }
    }

    // @todo
    // public applyWitnessTx(): void {}

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
                if (k === "lastBlockAppHash" || k === "publicKey") {
                    return Buffer.from(v);
                } else if (isString(v) && /^(\d*)n$/.test(v)) {
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
        if (this._readOnly) {
            return;
        }
        const strData = JSON.stringify(this.toJSON(), (k, v) => {
            if (typeof v === "bigint") {
                return v.toString().concat("n");
            } else if (k === "lastBlockAppHash" || k === "publicKey") {
                return v === null ? v : v.data;
            } else {
                return v;
            }
        });
        await new Promise(this.internalWriteFile(strData));
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

        // generate initial hex string
        const initialHashString = hashObject(
            thisCopy,
            {
                replacer: (v) => typeof v === "bigint" ? v.toString() : v,
                unorderedArrays: true
            }
        );

        // generate the SHA256 hash of the object hash
        rawHash.update(initialHashString);

        // generate the hashed value
        const hash = rawHash.digest();
        return hash;
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
            round: cloneDeep(this.round),
            events: cloneDeep(this.events),
            posters: cloneDeep(this.posters),
            validators: cloneDeep(this.validators),
            lastEvent: clone(this.lastEvent),
            consensusParams: cloneDeep(this.consensusParams),
            orderCounter: clone(this.orderCounter),
            lastBlockHeight: clone(this.lastBlockHeight),
            lastBlockAppHash: clone(this.lastBlockAppHash),
        };
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
        };
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
        };
    }
}
