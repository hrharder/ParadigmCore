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