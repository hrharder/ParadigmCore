[ParadigmCore](../README.md) > ["core/checkTx"](../modules/_core_checktx_.md)

# External module: "core/checkTx"

## Index

### Functions

* [checkTxWrapper](_core_checktx_.md#checktxwrapper)

---

## Functions

<a id="checktxwrapper"></a>

###  checkTxWrapper

▸ **checkTxWrapper**(state: *`State`*, Order: *`any`*): `function`

*Defined in [core/checkTx.ts:40](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/core/checkTx.ts#L40)*

Perform light verification on incoming transactions, accept valid transactions to the mempool, and reject invalid ones.

Currently, all transaction types are checked before mempool/gossip by:

*   encoding according to spec/implementation of TxGenerator and TxBroadcaster
*   zlib compression
*   signature from an active validator
*   transaction type specific rules

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | `State` |
| Order | `any` |

**Returns:** `function`

___

