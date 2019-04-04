/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name Witness.ts
 * @module witness
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  15-October-2018
 * @date (modified) 13-March-2019
 *
 * The Witness class implements a one-way (read only) peg to Ethereum,
 * and adds a "finality gadget" via a block maturity requirement for events
 * before they can modify the OrderStream's state.
 *
 * See the spec doc in `/spec/ethereum-peg.md` for more information.
 */

// Third party and stdlib imports
import { EventEmitter } from "events";
import * as _ from "lodash";
import * as TruffleContract from "truffle-contract";
import { URL } from "url";
const Web3 = require("web3");

// ParadigmCore modules/classes
import { contracts, eventDecoder } from "paradigm-contracts";
import { TxGenerator } from "src/core/util/TxGenerator";
import { createWitnessEventObject } from "../core/util/utils";

// ParadigmCore common utils
import { default as codes } from "../common/Codes";
import { err, log, warn } from "../common/log";
import { messages as msg } from "../common/static/messages";
import { TendermintRPC } from "../common/TendermintRPC";

// supporting type definition(s)
// import * as W3 from "web3";
// import { WebsocketProvider } from "web3-providers/types";

/**
 * A Witness supports a one way peg-zone between Ethereum and the OrderStream to
 * enable tracking of the PosterStaking contract and witness events.
 *
 * See spec for more details.
 */
export class Witness {

    /**
     * Static generator to create new rebalancer instances.
     *
     * @returns Promise that resolves to a new rebalancer instance.
     *
     * @param options {object} options object with the following parameters:
     *  - options.provider          {string} web3 provider URL
     *  - options.periodLimit       {number} max transactions per period
     *  - options.periodLength      {number} staking period length (ETH blocks)
     *  - options.finalityThreshold {number} required block maturity
     *  - options.tendermintRpcUrl  {string} url of the local tendermint rpc server
     *  - options.txGenerator       {TxGenerator} tx generator/signer
     */
    public static async create(options: any): Promise<Witness> {
        let instance: Witness;   // Stores new Witness instance

        try {
            // Create new rebalancer instance
            instance = new Witness(options);

            // Initialize instance (and store response code)
            const code = await instance.initialize();

            // Reject promise if initialization failed
            if (code !== codes.OK) {
                throw new Error(`initialization failed with code: ${code}`);
            }
        } catch (error) {
            // Throw error with message and code from above
            throw new Error(error.message);
        }

        // Return new instance upon successful initialization
        return instance;
    }

    /**
     * Generates an output address:limit mapping based on a provided
     * address:balance mapping, and a total throughput limit.
     *
     * @param bals      {Balances} current address:balance mapping
     * @param limit     {number} total number of orders accepted per period
     */
    public static genLimits(bals: PosterBalances, limit: number): Limits {
        let total: bigint = BigInt(0);      // Total amount currently staked
        const output: Limits = {};          // Generated output mapping

        // Calculate total balance currently staked
        Object.keys(bals).forEach((k, v) => {
            if (bals.hasOwnProperty(k) && typeof(bals[k]) === "bigint") {
                total += bals[k];
            }
        });

        // Compute the rate-limits for each staker based on stake size
        Object.keys(bals).forEach((k, v) => {
            if (bals.hasOwnProperty(k) && typeof(bals[k]) === "bigint") {
                // Compute proportional order limit
                const balNum = parseInt(bals[k].toString(), 10);
                const totNum = parseInt(total.toString(), 10);
                const lim = (balNum / totNum) * limit;

                // Create limit for each address
                output[k] = parseInt(lim.toString(), 10);
            }
        });

        // Return constructed output mapping.
        return output;
    }

    /**
     * End static methods.
     *
     * Instance methods and variables below.
    **/

    /**
     * Boolean value that indicates weather or not `.initialize()` has been
     * called successfully.
     */
    private initialized: boolean;

    /**
     * Boolean value that indicates if the instance is "listening" and attesting
     * to (via ABCI transaction) Ethereum events.
     */
    private started: boolean;

    /**
     * URL of the configured `web3` provider.
     */
    private web3provider: URL;

    /**
     * The `web3.js` provider instance, configured when assigned based on
     * witness configuration options.
     */
    private web3: any;

    // ETHEREUM-RELATED

    /**
     * THe currently agreed up block-maturation threshold for Ethereum events.
     * This value should be agreed upon by all validators.
     */
    private finalityThreshold: number;

    /**
     * The height of the Ethereum blockchain when this `Witness` instance was
     * started. Used to check if historical events (before witness started) are
     * confirmed or not.
     */
    private initHeight: number;

    /** The "best" (highest) known height of the Ethereum blockchain. */
    private currHeight: number;

    // STAKING PERIOD PARAMETERS

    /** The incremental number tracking the current rebalance period. */
    private periodNumber: number;

    /** The length of the current period (in Ethereum blocks). */
    private periodLength: number;

    /** The number of transactions accepted in a period. Used for rebalance. */
    private periodLimit: number;

    /** The block at which the current period ends. */
    private periodStart: number;

    /** The block at which current period ends. */
    private periodEnd: number;

    /**
     * Event emitter triggered when a rebalance TX is included in a block.
     *
     * @todo better doc
     */
    private rebalanceEmitter: EventEmitter;

    /**
     * The `web3.Contract` instance of the EventEmitter contract, used to
     * interface with the paradigm contract system.
     */
    private eventEmitterContract: any;

    /** Witness class's connection to the Tendermint RPC server. */
    private tmRpc: TendermintRPC; // TxBroadcaster;

    /** Node URL object of provided Tendermint RPC URl. */
    private tmRpcUrl: URL;

    /** Number of time to attempt to recover connection to Tendermint RPC. */
    private reconnAttempts: number;

    /** Interval (in ms) between each attempt to reconnect with the RPC server. */
    private reconnInterval: number;

    /** ABCI transaction generator and signer (for validators). */
    private generator: TxGenerator;

    /** Mapping that tracks pending events from the Ethereum contracts. */
    private events: any;

    /** Mapping that tracks poster balances. Used to submit proposals. */
    private posterBalances: PosterBalances;

    /** Emitter used to support async tx broadcast */
    private txEmitter: EventEmitter;

    /**
     * PRIVATE constructor. Do not use. Create new `witness` instances with
     * Witness.create(options)
     *
     * @param opts {object} options object - see .create() docstring
     */
    private constructor(opts: any) {
        // Validate Web3 provider URL
        try {
            this.web3provider = new URL(opts.provider);
        } catch (error) {
            throw new Error("invalid web3 provider URL");
        }

        // validate tendermint rpc url
        try {
            this.tmRpcUrl = new URL(opts.tendermintRpcUrl);
        } catch (error) {
            throw new Error("invalid tendermint-rpc URL");
        }

        // Tendermint RPC connection interval/config
        this.reconnAttempts = opts.reconnAttempts;
        this.reconnInterval = opts.reconnInterval;

        // Local TX generator (and validator signer)
        this.generator = opts.generator;
        this.txEmitter = new EventEmitter();

        // Create dedicated Tendermint RPC connection for the Witness instance
        this.tmRpc = new TendermintRPC(
            this.tmRpcUrl.href,
            this.reconnAttempts,
            this.reconnInterval
        );

        // attach tx handlers (for interface with TendermintRPC)
        this.txEmitter.on("tx", (inTx?: SignedTransaction) => {
            this.tmRpc.submitTx(inTx).then((res: any) => {
                log("peg", `successfully executed tx: ${res.log} at ${Date.now()}`);
            }).catch((error) => {
                warn("peg", `failed sending tx: ${error}`);
            });
        });

        // Finality threshold
        this.finalityThreshold = opts.finalityThreshold;

        // Staking period parameters
        this.periodLimit = opts.periodLimit;
        this.periodLength = opts.periodLength;
        this.periodNumber = 0;

        // Mapping objects
        this.events = {};
        this.posterBalances = {};

        // Set rebalancer instance status
        this.initialized = false;
        this.started = false;
    }

    /**
     * Initialize rebalancer instance by connecting to a web3 endpoint and
     * instantiating contract instance. Uses error codes.
     *
     * @returns Promise that resolves to 0 if OK
     */
    public async initialize(): Promise<number> {
        // Check if already initialized
        if (this.initialized && this.initHeight !== undefined) {
            return codes.OK;
        }

        // Connect to Web3 provider
        const code = this.connectWeb3();
        if (code !== codes.OK) { return code; }

        // Get current Ethereum height
        try {
            this.initHeight = await this.web3.eth.getBlockNumber();
        } catch (_) {
            return codes.NO_BLOCK; // Unable to get current Ethereum height
        }

        // Create staking contract instance via TruffleContract
        try {
            const EventEmitterContract = TruffleContract(contracts.EventEmitter);
            EventEmitterContract.setProvider(this.web3.currentProvider);
            this.eventEmitterContract = await EventEmitterContract.deployed();
        } catch (error) {
            err("peg", error.message);
            return codes.CONTRACT; // Unable to initialize staking contract
        }

        // Only returns OK (0) upon successful initialization
        this.initialized = true;
        return codes.OK;
    }

    /**
     * Starts rebalancer instance after node synchronization, and connects to
     * local Tendermint instance via ABCI.
     *
     * @returns 0 if OK
     */
    public async start(): Promise<number> {
        // start tendermint RPC connection
        try {
            await this.tmRpc.connect(this.reconnAttempts, this.reconnInterval);
            log("peg", "connected to the tendermint RPC server");

            // handle case where this is a restart
            const roundNo = parseInt((await this.tmRpc.query("round/number")).info, 10);
            if (roundNo > 0) {
                const startsAt = parseInt((await this.tmRpc.query("round/startsAt")).info, 10);
                const endsAt = parseInt((await this.tmRpc.query("round/endsAt")).info, 10);
                this.synchronize(roundNo, startsAt, endsAt);
            }
        } catch (error) {
            err("peg", error.message);
            return codes.NO_ABCI;
        }

        // Subscribe to Ethereum and ParadigmCore events
        const subCode = this.subscribe();
        if (subCode !== codes.OK) { return subCode; }

        // Successful startup
        this.started = true;
        return codes.OK;
    }

    /**
     * Use in ABCI commit() to update when a new state is accepted. Updates
     * staking period parameters.
     *
     * @param round     {number}    accepted new stake round (incrementing)
     * @param startsAt  {number}    accepted starting block for new period
     * @param endsAt    {number}    accepted ending block for new period
     */
    public synchronize(round: number, startsAt: number, endsAt: number): void {
        // Check that new round is the next round
        if (round !== (this.periodNumber + 1)) {
            err("peg", "new round is not one greater than current.");
            err("peg", "this witness may be out of sync with peers.");
            err("peg", "this message will also show after a restart and can be ignored.");
        }

        // Update parameters
        this.periodNumber = round;
        this.periodStart = startsAt;
        this.periodEnd = endsAt;
        return;
    }

    /**
     * Used to connect to Web3 provider. Called during initialization, and
     * if a web3 disconnect is detected.
     */
    private getProvider(): any {
        let providerInst;

        // Pull provider URL and protocol from instance
        const { protocol, href } = this.web3provider;

        // Supports WS providers only
        try {
            if (protocol === "ws:" || protocol === "wss:") {
                providerInst = new Web3.providers.WebsocketProvider(href);
            } else {
                throw new Error("invalid provider URI, must be ws/wss");
            }
        } catch (error) {
            throw new Error(error.message);
        }

        // Log connection message
        providerInst.on("connect", () => {
            log("peg", "successfully connected to web3 provider");
        });

        // Attempt to reconnect on termination
        providerInst.on("end", () => {
            err("peg", "web3 connection closed, attempting to reconnect...");
            try {
                this.web3.setProvider(this.getProvider());
            } catch (error) {
                err("peg", `failed reconnecting to provider: ${error.message}`);
            }
        });

        // Attempt to reconnect on any error
        providerInst.on("error", () => {
            err("peg", "web3 provider error, attempting to reconnect...");
            try {
                this.web3.setProvider(this.getProvider());
            } catch (error) {
                err("peg", `failed reconnecting to provider: ${error.message}`);
            }
        });

        return providerInst;
    }

    /**
     * Used to create web3 instance (based on provider generated in
     * `this.getProvider()` method).
     */
    private connectWeb3(): number {
        // Check if already connected to web3 instance
        if (typeof(this.web3) !== "undefined") {
            this.web3 = new Web3(this.web3.currentProvider);
            return codes.OK;
        } else {
            // Create new Web3 instance
            try {
                this.web3 = new Web3(this.getProvider());
            } catch (error) {
                return codes.WEB3_INST; // Unable to create web3 instance
            }
            return codes.OK;
        }
    }

    /**
     * Subscribe to relevant Ethereum events and attach handlers.
     *
     * @param from  {number}    the block from which to subscribe to events
     */
    private subscribe(from: number = 0): number {
        // subscribe to 'StakeMade' events
        this.eventEmitterContract.ParadigmEvent({
            fromBlock: from,
        }, this.handleParadigmEvent);

        // subscribe to new blocks
        this.web3.eth.subscribe("newBlockHeaders", this.handleBlock);

        // subscribe to rebalance events on the OrderStream
        // replaces janky `commit()` event emitter from prev. versions
        // @todo - cleanup and move to methods
        // @todo - create type defs for tag-related stuff
        this.tmRpc.subscribe("tx.type='rebalance'", (data) => {
            let { tags } = data.TxResult.result;
            let params: any = {};
            tags.forEach((tag) => {
                const key = Buffer.from(tag.key, "base64").toString();
                const value = Buffer.from(tag.value, "base64").toString();

                const [ tagSubject, tagParam ] = key.split(".");
                if (tagSubject !== "round") { return; }
                params[tagParam] = value;
            });
            const { number, start, end } = params;
            log("peg", `detected rebalance tx in block, now on round ${number}`);
            this.synchronize(parseInt(number, 10), start, end);
        });

        // Success
        return codes.OK;
    }

    /**
     * Stake event handler. NOTE: events are indexed by the block they occur
     * in, not the finality block for that event.
     *
     * @param error {object}    error object
     * @param res   {object}    event response object
     */
    private handleParadigmEvent = (error: any, res: any) => {
        if (error !== null) {
            err("peg", msg.rebalancer.errors.badStakeEvent);
            return;
        }

        //
        let decodedEventData, block;

        // use decoder utils from ParadigmContract library
        try {
            decodedEventData = eventDecoder(res.returnValues);
            block = res.blockNumber;
        } catch (err) {
            console.log(`\nevent decode error\n`);
            return;
        }

        // will store witness event object
        const witnessEvent: WitnessData = createWitnessEventObject(
            decodedEventData,
            block
        );

        // ignore irrelevant events from contract system
        if (witnessEvent === undefined) { return; }

        // See if this is a historical event that has already matured
        if ((this.initHeight - block) > this.finalityThreshold) {
            this.updateBalance(witnessEvent);
            this.execEventTx(witnessEvent);
            return;
        }

        // If this is the first event from this block, create entry
        if (!this.events.hasOwnProperty(block)) {
            this.events[block] = {};
        }

        // Add event to confirmation queue
        this.events[block][witnessEvent.id] = witnessEvent;
        return;
    }

    /**
     * New Ethereum block event handler. Updates balances and executes ABCI
     * transactions at appropriate finality blocks.
     *
     * @param error {object}    error object
     * @param res   {object}    event response object
     */
    private handleBlock = (error: any, res: any) => {
        if (error !== null) {
            err("peg", msg.rebalancer.errors.badBlockEvent);
            return;
        }

        // Update current Ethereum block
        this.currHeight = res.number;

        // See if this is the first new block
        if ((this.periodNumber === 0) && (res.number > this.initHeight)) {
            log("peg", "proposing parameters for initial period");

            // Prepare proposal tx
            this.execRebalanceTx(0, res.number, this.periodLength);
            return;
        }

        // Calculate which block is reaching maturity
        const matBlock = this.currHeight - this.finalityThreshold;
        log(
            "peg",
            `ethereum block ${matBlock} matured, round ends at block ${this.periodEnd}`
        );

        // See if any events have reached finality
        if (this.events.hasOwnProperty(matBlock)) {
            // Update out-of-state balances with newly matured event and submit
            Object.keys(this.events[matBlock]).forEach(async (k) => {
                this.updateBalance(this.events[matBlock][k]);
                this.execEventTx(this.events[matBlock][k]);
            });

            // Once all balances have been updated, delete entry
            delete this.events[matBlock];
        }

        // See if the round has ended, and submit rebalance tx if so
        if (matBlock >= this.periodEnd) {
            this.execRebalanceTx(
                this.periodNumber,
                this.currHeight,
                this.periodLength,
            );
        }

        // Return once all tasks complete
        return;
    }

    /**
     * Perform "state transition" of instance balances. NOTE: this function
     * does not modify the state of the ABCI application, however it
     * implements the same logic as the state machine to ensure balances in
     * state are up-to-date with the instance balances.
     *
     * @param event   {StakeEvent}    event object
     */
    private updateBalance(event: WitnessData): void {
        // only apply balance update for events with subject 'poster'
        if (event.subject !== "poster") {
            return;
        }

        // set balance of account to event
        const { address, amount } = event;
        this.posterBalances[event.address] = BigInt(amount);

        // prune account if it is now empty
        if (this.posterBalances[address] === BigInt(0)) {
            delete this.posterBalances[address];
        }

        return;
    }

    /**
     * Generates a rebalance transaction object by computing proportional
     * allocation of transaction throughput based on stake size.
     *
     * @param round    {number}    the current staking period number
     * @param start    {number}    period starting ETG block number
     * @param length   {number}    the length of each period in ETH blocks
     */
    private execRebalanceTx(round, start, length): SignedTransaction {
        let map: Limits;

        if (round === 0) {
            // Submit a blank mapping if this is the first proposal
            map = {};
        } else {
            // Generate a mapping based on balances otherwise
            map = Witness.genLimits(this.posterBalances, this.periodLimit);
        }

        // Create and sign transaction object
        const tx: SignedTransaction = this.generator.create({
            data: {
                limits: map,
                round: {
                    endsAt: start + length,
                    limit: this.periodLimit,
                    number: round + 1,
                    startsAt: start - 1,
                },
            },
            type: "rebalance",
        });

        // trigger broadcast
        this.txEmitter.emit("tx", tx);
        return;
    }

    /**
     * Generate and send and event witness transaction.
     *
     * @param event     {object}    event object
     */
    private execEventTx(event: WitnessData): Promise<void> {
        // Create and sign transaction object
        const { subject, type, amount, block, address, publicKey, id } = event;
        const tx: SignedTransaction = this.generator.create({
            data: {
                subject,
                type,
                amount,
                block,
                address,
                publicKey,
                id
            },
            type: "witness",
        });

        // trigger broadcast
        this.txEmitter.emit("tx", tx);
        return;
    }
}
