[ParadigmCore](../README.md) > ["core/handlers/order"](../modules/_core_handlers_order_.md)

# External module: "core/handlers/order"

## Index

### Functions

* [checkOrder](_core_handlers_order_.md#checkorder)
* [deliverOrder](_core_handlers_order_.md#deliverorder)

---

## Functions

<a id="checkorder"></a>

###  checkOrder

▸ **checkOrder**(tx: *`SignedOrderTx`*, state: *`State`*, Order: *`any`*): `ResponseCheckTx`

*Defined in [core/handlers/order.ts:33](https://github.com/paradigmfoundation/paradigmcore/blob/5599f72/src/core/handlers/order.ts#L33)*

Performs light verification of OrderBroadcast transactions before accepting to local mempool.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedOrderTx` |  decoded transaction body |
| state | `State` |  current round state |
| Order | `any` |

**Returns:** `ResponseCheckTx`

___
<a id="deliverorder"></a>

###  deliverOrder

▸ **deliverOrder**(tx: *`SignedOrderTx`*, state: *`State`*, Order: *`any`*): `ResponseDeliverTx`

*Defined in [core/handlers/order.ts:76](https://github.com/paradigmfoundation/paradigmcore/blob/5599f72/src/core/handlers/order.ts#L76)*

Execute an OrderBroadcast transaction in full, and perform state modification.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedOrderTx` |  decoded transaction body |
| state | `State` |  current round state |
| Order | `any` |

**Returns:** `ResponseDeliverTx`

___

