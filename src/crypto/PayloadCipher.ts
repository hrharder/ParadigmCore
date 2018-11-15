/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name PayloadCipher.ts
 * @module src/crypto
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  21-September-2018
 * @date (modified) 15-November-2018
 *
 * Compression and encoding (and decompression and decoding) for local ABCI
 * transactions.
 */

import * as zlib from "zlib";
const { IN_ENC, OUT_ENC } = process.env;    // @TODO: hardcode?

/**
 * Provides static methods for encoding/compressing and decoding/decompressing
 * transaction objects.
 */
export class PayloadCipher {

    /**
     * Construct encoded and compressed output string from raw input object.
     * This method implements a replacer to allow serialization of objects
     * containing `bigint` types.
     *
     * @param payload {object} raw input object
     */
    public static txEncodeFromObject(payload: object): string {
        let rawStr: string; // raw input string
        let inBuff: Buffer; // raw input buffer
        let cpBuff: Buffer; // compressed buffer
        let outStr: string; // encoded output string

        try {
            rawStr = JSON.stringify(payload, (_, v) => {
                // Replace BigInt with custom strings
                if (typeof(v) === "bigint") {
                    return `${v.toString()}n`;
                } else {
                    return v;
                }
            });
            inBuff = Buffer.from(rawStr, PayloadCipher.inEncoding);
            cpBuff = zlib.deflateSync(inBuff);
            outStr = cpBuff.toString(PayloadCipher.outEncoding);
        } catch (error) {
            throw new Error("Error encoding payload.");
        }
        return outStr;
    }

    /**
     * encodeFromObject (public static method): Construct encoded and compressed
     * output string from raw input object.
     *
     * @param input {string} encoded input string
     */
    public static encodeFromObject(payload: object): string {
        let rawStr: string; // raw input string
        let inBuff: Buffer; // raw input buffer
        let cpBuff: Buffer; // compressed buffer
        let outStr: string; // encoded output string

        try {
            rawStr = JSON.stringify(payload);
            inBuff = Buffer.from(rawStr, PayloadCipher.inEncoding);
            cpBuff = zlib.deflateSync(inBuff);
            outStr = cpBuff.toString(PayloadCipher.outEncoding);
        } catch (err) {
            throw new Error("Error encoding payload.");
        }
        return outStr;
    }

    /**
     * Construct encoded and compressed output string from raw input string.
     *
     * @param payload {string} raw input string (uncompressed)
     */
    public static encodeFromString(payload: string): string {
        const rawStr: string = payload; // raw input string
        let inBuff: Buffer; // raw input buffer
        let cpBuff: Buffer; // compressed buffer
        let outStr: string; // encoded output string

        try {
            inBuff = Buffer.from(rawStr, PayloadCipher.inEncoding);
            cpBuff = zlib.deflateSync(inBuff);
            outStr = cpBuff.toString(PayloadCipher.outEncoding);
        } catch (err) {
            throw new Error("Error encoding payload.");
        }
        return outStr;
    }

    /**
     * Construct decoded and decompressed output string from encoded and
     * compressed input.
     *
     * @param input {string} encoded input string
     */
    public static decodeToString(input: string): string {
        let inBuff: Buffer; // input buffer
        let dcBuff: Buffer; // decompressed buffer
        let outStr: string; // decoded string

        try {
            inBuff = Buffer.from(input, PayloadCipher.outEncoding);
            dcBuff = zlib.inflateSync(inBuff);
            outStr = dcBuff.toString(PayloadCipher.inEncoding);
        } catch (err) {
            throw new Error("Error decoding payload.");
        }
        return outStr;
    }

    /**
     * Construct transaction object from encoded and compressed string.
     *
     * @param input {string} encoded input string
     */
    public static decodeToObject(input: string): object {
        let inBuff: Buffer; // input buffer
        let dcBuff: Buffer; // decompressed buffer
        let outStr: string; // decoded string
        let outObj: object; // output object

        try {
            inBuff = Buffer.from(input, PayloadCipher.outEncoding);
            dcBuff = zlib.inflateSync(inBuff);
            outStr = dcBuff.toString(PayloadCipher.inEncoding);
        } catch (err) {
            throw new Error("Error decoding payload.");
        }

        try {
            outObj = JSON.parse(outStr);
        } catch (err) {
            throw new Error("Error creating object from JSON");
        }

        return outObj;
    }

    /**
     * ABCIdecode (public static method): Use to decode an incoming Buffer as
     * delivered via Tendermint core.
     *
     * @param inBuff {Buffer}
     */
    public static ABCIdecode(inBuff: Buffer): object {
        // TODO: consider depreciating and wrapping into other function

       const inStr: string = inBuff.toString(PayloadCipher.inEncoding);
       return PayloadCipher.decodeToObject(inStr);
    }

    // encoding for in/output of orders, default utf8
    private static inEncoding: string = IN_ENC;

    // encoding used for URL transport, default base64
    private static outEncoding: string = OUT_ENC;
}
