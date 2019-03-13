import * as zlib from "zlib";

/**
 * Decodes and decompresses a raw transaction string.
 *
 * @param tx encoded, compressed TX string (as seen by Tendermint)
 */
export function decodeTx(tx: string): string {
    let inBuff: Buffer; // input buffer
    let dcBuff: Buffer; // decompressed buffer
    let outStr: string; // decoded string

    try {
        inBuff = Buffer.from(Buffer.from(tx, "base64").toString("utf8"), "base64");
        dcBuff = zlib.inflateSync(inBuff);
        outStr = dcBuff.toString("utf8");
    } catch (error) {
        throw Error(`Failed to decode TX: ${error.message}`);
    }

    // return json string
    return outStr;
}
