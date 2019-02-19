"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
function pubToAddr(input) {
    if (!(input instanceof Buffer)) {
        throw Error("bad input type");
    }
    if (input.length !== 32) {
        throw Error("expected input to be 32 bytes");
    }
    return Buffer.from(crypto_1.createHash("sha256").
        update(input).
        digest("hex").
        slice(0, 40).
        toLowerCase(), "hex");
}
exports.pubToAddr = pubToAddr;
function privToPub(input) {
    if (!(input instanceof Buffer)) {
        throw Error("bad input type");
    }
    if (input.length !== 64) {
        throw Error("expected input to be 64 bytes");
    }
    return input.slice(32, 64);
}
exports.privToPub = privToPub;
function validatorUpdate(pubKey, power) {
    return {
        pubKey: {
            type: "ed25519",
            data: pubKey
        },
        power: parseInt(power.toString(), 10),
    };
}
exports.validatorUpdate = validatorUpdate;
function doForEachValidator(state, cb) {
    Object.keys(state.validators).forEach(cb);
}
exports.doForEachValidator = doForEachValidator;
