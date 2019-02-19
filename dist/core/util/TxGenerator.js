"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const ed25519_1 = require("ed25519");
const bigIntUtils_1 = require("../../common/static/bigIntUtils");
class TxGenerator {
    static isValidInput(rawTx) {
        if (typeof (rawTx) !== "object" ||
            Object.keys(rawTx).length !== 2 ||
            typeof (rawTx.type) !== "string" ||
            typeof (rawTx.data) !== "object") {
            return false;
        }
        switch (rawTx.type) {
            case "order": {
                const txData = rawTx.data;
                if (typeof (txData.posterSignature) !== "object" ||
                    typeof (txData.subContract) !== "string") {
                    return false;
                }
                else {
                    return true;
                }
            }
            case "stream": {
                return true;
            }
            case "witness": {
                const txData = rawTx.data;
                if (Object.keys(txData).length !== 7 ||
                    typeof (txData.block) !== "number" ||
                    typeof (txData.address) !== "string") {
                    console.log("\n\n (txGenerator): bad witness event data\n");
                    return false;
                }
                else {
                    return true;
                }
            }
            case "rebalance": {
                const txData = rawTx.data;
                if (Object.keys(txData).length !== 2 ||
                    typeof (txData.limits) !== "object" ||
                    typeof (txData.round) !== "object" ||
                    Object.keys(txData.round).length !== 4 ||
                    typeof (txData.round.endsAt) !== "number" ||
                    typeof (txData.round.startsAt) !== "number" ||
                    typeof (txData.round.number) !== "number" ||
                    typeof (txData.round.limit) !== "number") {
                    return false;
                }
                else {
                    return true;
                }
            }
            default: {
                return false;
            }
        }
    }
    constructor(options) {
        switch (options.encoding) {
            case "base64": {
                this.encoding = "base64";
                break;
            }
            case "hex": {
                this.encoding = "hex";
                break;
            }
            case undefined: {
                this.encoding = "hex";
                break;
            }
            default: {
                throw new Error("Invalid encoding.");
            }
        }
        try {
            this.pubKey = Buffer.from(options.publicKey, "base64");
            this.privKey = Buffer.from(options.privateKey, "base64");
        }
        catch (error) {
            throw new Error("invalid raw keypair.");
        }
        if (this.pubKey.length !== 32 || this.privKey.length !== 64) {
            throw new Error("supplied keypair of invalid length.");
        }
        let tempAddr;
        try {
            tempAddr = crypto_1.createHash("sha256").update(this.pubKey).digest("hex");
            tempAddr = tempAddr.slice(0, 40);
            this.address = Buffer.from(tempAddr, "hex");
        }
        catch (error) {
            throw new Error("unable to generate address from public key.");
        }
    }
    create(rawTx) {
        if (!TxGenerator.isValidInput(rawTx)) {
            throw new Error("invalid transaction data.");
        }
        let message;
        let signature;
        try {
            message = Buffer.from(JSON.stringify(rawTx.data, bigIntUtils_1.bigIntReplacer), "utf8");
            signature = ed25519_1.Sign(message, this.privKey);
        }
        catch (error) {
            throw new Error("failed to generate signature.");
        }
        return {
            ...rawTx,
            proof: {
                valPubKey: this.pubKey.toString(this.encoding),
                signature: signature.toString(this.encoding),
            },
        };
    }
}
exports.TxGenerator = TxGenerator;
