[ParadigmCore](../README.md) > ["src/core/checkTx"](../modules/_src_core_checktx_.md)

# External module: "src/core/checkTx"

## Index

### Functions

* [checkTxWrapper](_src_core_checktx_.md#checktxwrapper)

---

## Functions

<a id="checktxwrapper"></a>

###  checkTxWrapper

▸ **checkTxWrapper**(state: *`State`*, Order: *`any`*): `function`

*Defined in [src/core/checkTx.ts:42](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/core/checkTx.ts#L42)*

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

