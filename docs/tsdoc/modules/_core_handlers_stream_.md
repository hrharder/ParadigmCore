[ParadigmCore](../README.md) > ["core/handlers/stream"](../modules/_core_handlers_stream_.md)

# External module: "core/handlers/stream"

## Index

### Functions

* [checkStream](_core_handlers_stream_.md#checkstream)
* [deliverStream](_core_handlers_stream_.md#deliverstream)

---

## Functions

<a id="checkstream"></a>

###  checkStream

▸ **checkStream**(tx: *`SignedStreamTx`*, state: *`State`*): `object`

*Defined in [core/handlers/stream.ts:31](https://github.com/paradigmfoundation/paradigmcore/blob/a5bd142/src/core/handlers/stream.ts#L31)*

Used to perform mempool verification of StreamBroadcast transactions.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedStreamTx` |  decoded transaction body |
| state | `State` |  current round state |

**Returns:** `object`

___
<a id="deliverstream"></a>

###  deliverStream

▸ **deliverStream**(tx: *`SignedStreamTx`*, state: *`State`*): `object`

*Defined in [core/handlers/stream.ts:42](https://github.com/paradigmfoundation/paradigmcore/blob/a5bd142/src/core/handlers/stream.ts#L42)*

Execute StreamBroadcast transactions in full, and perform state modification.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedStreamTx` |  decoded transaction body |
| state | `State` |  current round state |

**Returns:** `object`

___

