# Stream Server Specification (WIP)
The `stream` server is a class in ParadigmCore that is a component of the `api` module. It is technically an optional module for validators to run, but can provide a simple way for applications to access real-time blockchain data, including decoded and parsed `order` transactions.

If the module is disabled, applications will need to process the blockchain "manually", meaning they will need to:

- Decode and decompress ("inflate") all transactions in the blockchain (at least temporarily)
- Monitor the blockchain for `order` validation events or transaction inclusions
- Handle next steps dependant on application type

For performance-critical application this custom process will likely be the desired route, but the optional `stream` WebSocket API provides convenience and a demonstration implementation.

## Status of this document

Currently this doc outlines (at a high level) the existing implementation of message structure/encoding. It will be adapted into a spec once a sensible format is decided upon.

The current encoding format can be made more effecient, and is subject to non-determinism due to JSON serialization (see [the issue here](https://github.com/ParadigmFoundation/ParadigmCore/issues/48)).

## Current implementation

The current implementation of transaction format and message encoding/compressing/signing is outlined below. This should be adapted as a better format is implemented.  

### Raw transaction format

All validator-signed transactions have the following outer-level schema (after decoding/decompression):

```js
// JSON shown (in JS)

const decodedSignedTx = {
  "type": "" // witness, order, or rebalance
  "data": {} // tx-type specific schema
  "proof": {
    "valPubKey": "" // reported validator public key
    "signature": "" // ed25519 signature (hex str)
  }
}
```

Where `proof.signature` is an ed25519 signature of the raw JSON-encoded `data` bytes (another to-do: change to signature of a hash) .

Functions found in `utils` and `core/utils` allow decoding and parsing of raw messages along with other utilities. 

### Encoding process

Transactions originate by calls to [`core/utils/TxGenerator`](https://github.com/paradigmfoundation/paradigmcore/blob/dev/src/core/util/TxGenerator.ts) instances, where raw transaction messages (see above) are encoded as follows (summarized).

1. Construct `tx.data` object depending on `tx.type`
1. Generate `message` from "raw" transaction bytes (TODO: deterministic serialization)
   - Generate JSON string of transaction object
   - `Buffer` string with base64 encoding
1. Sign `message` byte array using the `ed25519` signature specification and library.
   - Store `hex` encoded byte array in `tx.proof.signature` resultant signature 
   - Append `base64` encoded validator public key as `tx.proof.valPubKey`
1. Serialize (see above) entire transaction object (for `bigint` related reasons)
   - Generate a `Buffer` from the `utf8` serialized string
   - Compress the byte array using `zlib`
   - Serialize the compressed byte array as a `base64`-encoded `utf8` string
1. The final serialized, compressed, signed `base64` encoded string is delivered to the `core` state machine by ABCI server.

### Decoding process (in ABCI application)

The current decoding process implementation can be found [here.](https://github.com/paradigmfoundation/paradigmcore/blob/dev/src/crypto/PayloadCipher.ts#L126)

In summary:

1. Receive raw `RequestDeliverTx` bytes from the ABCI server 
1. Convert the raw bytes to a `utf8` encoded string (a `base64` representation)
1. Generate a `Buffer` from the `base64` representation
1. Decompress the raw tx message buffer using the `zlib` compression library
1. Serialize the output buffer a JSON `utf8` string
