"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../common/log");
const valFunctions_1 = require("./valFunctions");
const lodash_1 = require("lodash");
const crypto_1 = require("crypto");
const ed25519_1 = require("ed25519");
const zlib = require("zlib");
function preVerifyTx(tx, state) {
    let isValid;
    let valNodeId;
    try {
        const msg = Buffer.from(JSON.stringify(tx.data), "utf8");
        const sig = Buffer.from(tx.proof.signature, "hex");
        const pub = Buffer.from(tx.proof.valPubKey, "hex");
        isValid = ed25519_1.Verify(msg, sig, pub);
        valNodeId = valFunctions_1.pubToAddr(pub).toString("hex");
    }
    catch (error) {
        return false;
    }
    if (!state.validators.hasOwnProperty(valNodeId)) {
        return false;
    }
    return isValid;
}
exports.preVerifyTx = preVerifyTx;
function syncStates(source, target) {
    Object.keys(source).forEach((key) => {
        if (typeof source[key] !== "object") {
            target[key] = source[key].valueOf();
        }
        else {
            target[key] = lodash_1.cloneDeep(source[key]);
        }
    });
}
exports.syncStates = syncStates;
function decodeTx(raw) {
    let dcBuff;
    let outStr;
    let outObj;
    try {
        dcBuff = zlib.inflateSync(raw);
        outStr = dcBuff.toString("utf8");
    }
    catch (error) {
        throw new Error(`error decoding payload: ${error.message}`);
    }
    try {
        outObj = JSON.parse(outStr);
    }
    catch (error) {
        throw new Error(`error parsing json: ${error.message}`);
    }
    return outObj;
}
exports.decodeTx = decodeTx;
function encodeTx(raw) {
    let rawStr;
    let inBuff;
    let cpBuff;
    let outStr;
    try {
        rawStr = JSON.stringify(raw, (_, v) => {
            if (typeof (v) === "bigint") {
                return `${v.toString()}n`;
            }
            else {
                return v;
            }
        });
        inBuff = Buffer.from(rawStr, "utf8");
        cpBuff = zlib.deflateSync(inBuff);
        outStr = cpBuff.toString("base64");
    }
    catch (error) {
        throw new Error(`error encoding payload: ${error.message}`);
    }
    return outStr;
}
exports.encodeTx = encodeTx;
function newKVPair(_key, _value) {
    const key = Buffer.from(_key);
    const value = Buffer.from(_value.toString());
    return { key, value };
}
exports.newKVPair = newKVPair;
function computeConf(active) {
    if (active === 1 || active === 0) {
        return 1;
    }
    else if (active > 1) {
        return Math.floor(2 * (active / 3));
    }
    else {
        log_1.err("state", "unexpected case.");
        return 1;
    }
}
exports.computeConf = computeConf;
function stateUpdateConfThreshold(state, last) {
    state.consensusParams.confirmationThreshold = computeConf(last.length);
}
exports.stateUpdateConfThreshold = stateUpdateConfThreshold;
function verifyOrder(order, state) {
    let orderBuf = Buffer.from(JSON.stringify(order), "utf8");
    let maxSize = state.consensusParams.maxOrderBytes;
    return (orderBuf.length <= maxSize);
}
exports.verifyOrder = verifyOrder;
function genLimits(posters, limit) {
    let total = BigInt(0);
    const output = {};
    Object.keys(posters).forEach((k, v) => {
        if (posters.hasOwnProperty(k)) {
            total += posters[k].balance;
        }
    });
    Object.keys(posters).forEach((k, v) => {
        if (posters.hasOwnProperty(k)) {
            const balNum = parseInt(posters[k].balance.toString());
            const totNum = parseInt(total.toString());
            const lim = (balNum / totNum) * limit;
            output[k] = parseInt(lim.toString(), 10);
        }
    });
    return output;
}
exports.genLimits = genLimits;
function parseWitness(data) {
    const { subject, block, amount, publicKey, address, id } = data;
    let intAmount, parsedAddress, parsedPublicKey;
    if (subject !== "validator" && subject !== "poster") {
        throw new Error("invlalid witness subject");
    }
    if (!lodash_1.isInteger(block)) {
        throw new Error("invalid target block");
    }
    if (!/^\d*$/.test(amount)) {
        throw new Error("invalid value for 'amount', should be integer");
    }
    intAmount = BigInt(amount);
    const buffAddr = Buffer.from(address.slice(2), "hex");
    if (buffAddr.length === 20) {
        parsedAddress = `0x${buffAddr.toString("hex")}`;
    }
    else {
        throw new Error("invalid target account address");
    }
    if (subject === "poster" && publicKey === null) {
        parsedPublicKey = null;
    }
    else if (subject === "poster" && publicKey !== null) {
        throw new Error("expected no publicKey for poster witnesses");
    }
    else if (subject === "validator" && publicKey === null) {
        throw new Error("expected publicKey for validator witnesses");
    }
    else if (subject === "validator" && publicKey !== null) {
        const pubKeyBuff = Buffer.from(publicKey, "base64");
        if (pubKeyBuff.length !== 32)
            throw new Error("bad validator pubKey");
        parsedPublicKey = pubKeyBuff.toString("base64");
    }
    return {
        subject,
        block,
        amount: intAmount,
        address: parsedAddress,
        publicKey: parsedPublicKey,
        id
    };
}
exports.parseWitness = parseWitness;
function addNewEvent(state, tx) {
    const { subject, amount, block, address, publicKey, id } = tx;
    if (subject !== "poster") {
        log_1.err("state", "TEMPORARY ignoring unsupported validator event attestation");
        return false;
    }
    if (state.lastEvent >= block) {
        log_1.warn("state", "ignoring new event that may have been applied");
        return false;
    }
    state.events[block][id] = {
        subject,
        address,
        amount,
        publicKey: null,
        conf: 1
    };
    if (state.consensusParams.confirmationThreshold === 1) {
        log_1.log("state", "immediately applying event in development mode");
        switch (subject) {
            case "poster": {
                return applyPosterEvent(state, tx);
            }
            default: {
                log_1.err("state", "unknown witness event subject");
                return false;
            }
        }
    }
    log_1.log("state", "added vote for event (new)");
    return true;
}
exports.addNewEvent = addNewEvent;
function addConfMaybeApplyEvent(state, tx) {
    const { subject, block, id } = tx;
    let accepted;
    state.events[block][id].conf += 1;
    if (state.consensusParams.confirmationThreshold > state.events[block][id].conf) {
        log_1.log("state", "added vote for event (existing)");
        return true;
    }
    switch (subject) {
        case "poster": {
            accepted = applyPosterEvent(state, tx);
            break;
        }
        case "validator": {
            log_1.err("state", "VALIDATOR TYPE NOT SUPPORTED YET");
            accepted = applyValidatorEvent(state, tx);
            break;
        }
        default: {
            log_1.err("state", "unknown witness event subject");
            accepted = false;
        }
    }
    return accepted;
}
exports.addConfMaybeApplyEvent = addConfMaybeApplyEvent;
function applyPosterEvent(state, tx) {
    const { amount, block, address, id } = tx;
    let accepted;
    if (state.posters.hasOwnProperty(address)) {
        state.posters[address].balance = amount;
        log_1.log("state", "confirmed and applied event to state (existing poster)");
        accepted = true;
    }
    else if (!state.posters.hasOwnProperty(address)) {
        state.posters[address] = {
            balance: BigInt(0),
            limit: null,
        };
        state.posters[address].balance = amount;
        log_1.log("state", "confirmed and applied event to state (new poster)");
        accepted = true;
    }
    else {
        log_1.err("state", "unexpected: no poster account, but requesting withdrawal");
        accepted = false;
    }
    if (!accepted)
        return false;
    delete state.events[block][id];
    if (Object.keys(state.events[block]).length === 0) {
        delete state.events[block];
    }
    if (amount === 0n && state.posters[address].balance === 0n) {
        delete state.posters[address];
    }
    if (accepted)
        state.lastEvent = block;
    return accepted;
}
exports.applyPosterEvent = applyPosterEvent;
function applyValidatorEvent(state, tx) {
    const { amount, block, address, id } = tx;
    return false;
}
exports.applyValidatorEvent = applyValidatorEvent;
function createWitnessEventHash(tx) {
    const hashVals = `${tx.subject}-${tx.amount}-${tx.block}-` +
        `${tx.address}-${tx.publicKey === null ? "null" : tx.publicKey}`;
    const hashBuffer = Buffer.from(hashVals);
    const hash = crypto_1.createHash("sha256").update(hashBuffer).digest("hex").slice(0, 16);
    return hash;
}
exports.createWitnessEventHash = createWitnessEventHash;
function createWitnessEventObject(eventData, block) {
    const { eventType } = eventData;
    if (eventType === "ValidatorRegistryUpdate" && eventData.tendermintPublicKey === undefined) {
        throw new Error("expected publicKey for validator witness event");
    }
    let outputEvent;
    switch (eventType) {
        case "PosterRegistryUpdate": {
            outputEvent = {
                subject: "poster",
                amount: eventData.stake,
                block,
                address: eventData.poster,
                publicKey: null
            };
            break;
        }
        case "ValidatorRegistryUpdate": {
            outputEvent = {
                subject: "validator",
                amount: eventData.stake,
                block,
                address: eventData.owner,
                publicKey: eventData.tendermintPublicKey
            };
            break;
        }
        default: {
            return;
        }
    }
    const eventId = createWitnessEventHash(outputEvent);
    outputEvent["id"] = eventId;
    return outputEvent;
}
exports.createWitnessEventObject = createWitnessEventObject;
function validTx(log, tags) {
    const res = { code: 0, log, };
    if (tags && tags.length > 0) {
        res["tags"] = tags;
    }
    return res;
}
exports.validTx = validTx;
function invalidTx(log, tags, code) {
    const res = { log };
    if (code && code === 0) {
        throw Error("Cannot accept code '0' for invalid tx response.");
    }
    else if (code && code !== 0) {
        res["code"] = code;
    }
    else {
        res["code"] = 1;
    }
    if (tags && tags.length > 0) {
        res["tags"] = tags;
    }
    return res;
}
exports.invalidTx = invalidTx;
