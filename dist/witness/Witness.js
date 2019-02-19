"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TruffleContract = require("truffle-contract");
const url_1 = require("url");
const Web3 = require("web3");
const paradigm_contracts_1 = require("paradigm-contracts");
const utils_1 = require("../core/util/utils");
const Codes_1 = require("../common/Codes");
const log_1 = require("../common/log");
const messages_1 = require("../common/static/messages");
const TendermintRPC_1 = require("../common/TendermintRPC");
const events_1 = require("events");
class Witness {
    constructor(opts) {
        this.handleParadigmEvent = (error, res) => {
            if (error !== null) {
                log_1.err("peg", messages_1.messages.rebalancer.errors.badStakeEvent);
                return;
            }
            const decodedEventData = paradigm_contracts_1.eventDecoder(res.returnValues);
            const block = res.blockNumber;
            const witnessEvent = utils_1.createWitnessEventObject(decodedEventData, block);
            if (witnessEvent === undefined)
                return;
            if ((this.initHeight - block) > this.finalityThreshold) {
                this.updateBalance(witnessEvent);
                this.execEventTx(witnessEvent);
                return;
            }
            if (!this.events.hasOwnProperty(block)) {
                this.events[block] = {};
            }
            this.events[block][witnessEvent.id] = witnessEvent;
            return;
        };
        this.handleBlock = (error, res) => {
            if (error !== null) {
                log_1.err("peg", messages_1.messages.rebalancer.errors.badBlockEvent);
                return;
            }
            this.currHeight = res.number;
            if ((this.periodNumber === 0) && (res.number > this.initHeight)) {
                log_1.log("peg", "proposing parameters for initial period");
                this.execRebalanceTx(0, res.number, this.periodLength);
                return;
            }
            const matBlock = this.currHeight - this.finalityThreshold;
            log_1.log("peg", `ethereum block ${matBlock} matured, round ends at block ${this.periodEnd}`);
            if (this.events.hasOwnProperty(matBlock)) {
                Object.keys(this.events[matBlock]).forEach(async (k) => {
                    this.updateBalance(this.events[matBlock][k]);
                    this.execEventTx(this.events[matBlock][k]);
                });
                delete this.events[matBlock];
            }
            if (matBlock >= this.periodEnd) {
                this.execRebalanceTx(this.periodNumber, this.currHeight, this.periodLength);
            }
            return;
        };
        try {
            this.web3provider = new url_1.URL(opts.provider);
        }
        catch (error) {
            throw new Error("invalid web3 provider URL");
        }
        try {
            this.tmRpcUrl = new url_1.URL(opts.tendermintRpcUrl);
        }
        catch (error) {
            throw new Error("invalid tendermint-rpc URL");
        }
        this.reconnAttempts = opts.reconnAttempts;
        this.reconnInterval = opts.reconnInterval;
        this.generator = opts.generator;
        this.txEmitter = new events_1.EventEmitter();
        this.txQueue = [];
        this.tmRpc = new TendermintRPC_1.TendermintRPC(this.tmRpcUrl.href, this.reconnAttempts, this.reconnInterval);
        this.txEmitter.on("tx", (inTx) => {
            this.tmRpc.submitTx(inTx).then((res) => {
                log_1.log("peg", `successfully executed tx: ${res.log}`);
            }).catch((err) => {
                log_1.warn("peg", `failed sending tx: ${err}`);
            });
        });
        this.finalityThreshold = opts.finalityThreshold;
        this.periodLimit = opts.periodLimit;
        this.periodLength = opts.periodLength;
        this.periodNumber = 0;
        this.events = {};
        this.posterBalances = {};
        this.initialized = false;
        this.started = false;
    }
    static async create(options) {
        let instance;
        try {
            instance = new Witness(options);
            const code = await instance.initialize();
            if (code !== Codes_1.default.OK) {
                throw new Error(`initialization failed with code: ${code}`);
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
        return instance;
    }
    static genLimits(bals, limit) {
        let total = BigInt(0);
        const output = {};
        Object.keys(bals).forEach((k, v) => {
            if (bals.hasOwnProperty(k) && typeof (bals[k]) === "bigint") {
                total += bals[k];
            }
        });
        Object.keys(bals).forEach((k, v) => {
            if (bals.hasOwnProperty(k) && typeof (bals[k]) === "bigint") {
                const balNum = parseInt(bals[k].toString());
                const totNum = parseInt(total.toString());
                const lim = (balNum / totNum) * limit;
                output[k] = parseInt(lim.toString(), 10);
            }
        });
        return output;
    }
    async initialize() {
        if (this.initialized && this.initHeight !== undefined) {
            return Codes_1.default.OK;
        }
        const code = this.connectWeb3();
        if (code !== Codes_1.default.OK) {
            return code;
        }
        try {
            this.initHeight = await this.web3.eth.getBlockNumber();
        }
        catch (_) {
            return Codes_1.default.NO_BLOCK;
        }
        try {
            const EventEmitter = TruffleContract(paradigm_contracts_1.contracts.EventEmitter);
            EventEmitter.setProvider(this.web3.currentProvider);
            this.eventEmitterContract = await EventEmitter.deployed();
        }
        catch (error) {
            log_1.err("peg", error.message);
            return Codes_1.default.CONTRACT;
        }
        this.initialized = true;
        return Codes_1.default.OK;
    }
    async start() {
        try {
            await this.tmRpc.connect(this.reconnAttempts, this.reconnInterval);
            log_1.log("peg", "connected to the tendermint RPC server");
        }
        catch (error) {
            log_1.err("peg", error.message);
            return Codes_1.default.NO_ABCI;
        }
        const subCode = this.subscribe();
        if (subCode !== Codes_1.default.OK) {
            return subCode;
        }
        this.started = true;
        return Codes_1.default.OK;
    }
    synchronize(round, startsAt, endsAt) {
        if (round !== (this.periodNumber + 1)) {
            log_1.err("peg", "new round is not one greater than current...");
            console.log(`round: ${round}, in-mem: ${this.periodNumber}`);
            log_1.err("peg", "this witness may be out of sync with peers...");
        }
        this.periodNumber = round;
        this.periodStart = startsAt;
        this.periodEnd = endsAt;
        return;
    }
    getProvider() {
        let provider;
        const { protocol, href } = this.web3provider;
        try {
            if (protocol === "ws:" || protocol === "wss:") {
                provider = new Web3.providers.WebsocketProvider(href);
            }
            else {
                throw new Error("invalid provider URI, must be ws/wss");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
        provider.on("connect", () => {
            log_1.log("peg", "successfully connected to web3 provider");
        });
        provider.on("end", () => {
            log_1.err("peg", "web3 connection closed, attempting to reconnect...");
            try {
                this.web3.setProvider(this.getProvider());
            }
            catch (error) {
                log_1.err("peg", `failed reconnecting to provider: ${error.message}`);
            }
        });
        provider.on("error", () => {
            log_1.err("peg", "web3 provider error, attempting to reconnect...");
            try {
                this.web3.setProvider(this.getProvider());
            }
            catch (error) {
                log_1.err("peg", `failed reconnecting to provider: ${error.message}`);
            }
        });
        return provider;
    }
    connectWeb3() {
        if (typeof (this.web3) !== "undefined") {
            this.web3 = new Web3(this.web3.currentProvider);
            return Codes_1.default.OK;
        }
        else {
            try {
                this.web3 = new Web3(this.getProvider());
            }
            catch (error) {
                return Codes_1.default.WEB3_INST;
            }
            return Codes_1.default.OK;
        }
    }
    subscribe(from = 0) {
        this.eventEmitterContract.ParadigmEvent({
            fromBlock: from,
        }, this.handleParadigmEvent);
        this.web3.eth.subscribe("newBlockHeaders", this.handleBlock);
        this.tmRpc.subscribe("tx.type='rebalance'", (data) => {
            let { tags } = data.TxResult.result;
            let params = {};
            tags.forEach((tag) => {
                const key = Buffer.from(tag["key"], "base64").toString();
                const value = Buffer.from(tag["value"], "base64").toString();
                const [tagSubject, tagParam] = key.split(".");
                if (tagSubject !== "round")
                    return;
                params[tagParam] = value;
            });
            const { number, start, end } = params;
            log_1.log("peg", `detected rebalance tx in block, now on round ${number}`);
            this.synchronize(parseInt(number, 10), start, end);
        });
        return Codes_1.default.OK;
    }
    updateBalance(event) {
        if (event.subject !== "poster") {
            return;
        }
        const { address, amount } = event;
        this.posterBalances[event.address] = BigInt(amount);
        if (this.posterBalances[address] === BigInt(0)) {
            delete this.posterBalances[address];
        }
        return;
    }
    execRebalanceTx(round, start, length) {
        let map;
        if (round === 0) {
            map = {};
        }
        else {
            map = Witness.genLimits(this.posterBalances, this.periodLimit);
        }
        const tx = this.generator.create({
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
        this.txEmitter.emit("tx", tx);
        return;
    }
    execEventTx(event) {
        const { subject, type, amount, block, address, publicKey, id } = event;
        const tx = this.generator.create({
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
        this.txEmitter.emit("tx", tx);
        return;
    }
}
exports.Witness = Witness;
