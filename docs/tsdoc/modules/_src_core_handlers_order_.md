[ParadigmCore](../README.md) > ["src/core/handlers/order"](../modules/_src_core_handlers_order_.md)

# External module: "src/core/handlers/order"

## Index

### Functions

* [checkOrder](_src_core_handlers_order_.md#checkorder)
* [deliverOrder](_src_core_handlers_order_.md#deliverorder)

---

## Functions

<a id="checkorder"></a>

###  checkOrder

▸ **checkOrder**(tx: *`SignedOrderTx`*, state: *`State`*, Order: *`any`*): `object`

*Defined in [src/core/handlers/order.ts:33](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/core/handlers/order.ts#L33)*

Performs light verification of OrderBroadcast transactions before accepting to local mempool.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedOrderTx` |  decoded transaction body |
| state | `State` |  current round state |
| Order | `any` |

**Returns:** `object`

___
<a id="deliverorder"></a>

###  deliverOrder

▸ **deliverOrder**(tx: *`SignedOrderTx`*, state: *`State`*, Order: *`any`*): `object`

*Defined in [src/core/handlers/order.ts:76](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/core/handlers/order.ts#L76)*

Execute an OrderBroadcast transaction in full, and perform state modification.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedOrderTx` |  decoded transaction body |
| state | `State` |  current round state |
| Order | `any` |

**Returns:** `object`

___

