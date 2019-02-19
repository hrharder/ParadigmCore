"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KVPair {
    constructor(key, value) {
        this.key = Buffer.from(key);
        this.value = Buffer.from(value.toString());
    }
    toJSON() {
        return { key: this.key, value: this.value };
    }
}
exports.KVPair = KVPair;
