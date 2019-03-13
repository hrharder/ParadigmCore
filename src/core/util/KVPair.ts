/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name KVPair.ts
 * @module core/util
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  10-February-2019
 * @date (modified) 12-March-2019
**/

/**
 * Represents a tendermint `KVPair`. Used in ABCI response messages.
 */
export class KVPair {
    public key: Buffer;
    public value: Buffer;
    constructor(key: string, value: string | number) {
        this.key = Buffer.from(key);
        this.value = Buffer.from(value.toString());
    }
    public toJSON() {
        return { key: this.key, value: this.value };
    }
}
