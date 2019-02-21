[ParadigmCore](../README.md) > ["core/handlers/rebalance"](../modules/_core_handlers_rebalance_.md)

# External module: "core/handlers/rebalance"

## Index

### Functions

* [checkRebalance](_core_handlers_rebalance_.md#checkrebalance)
* [deliverRebalance](_core_handlers_rebalance_.md#deliverrebalance)

---

## Functions

<a id="checkrebalance"></a>

###  checkRebalance

▸ **checkRebalance**(tx: *`SignedRebalanceTx`*, state: *`State`*): `ResponseCheckTx`

*Defined in [core/handlers/rebalance.ts:34](https://github.com/paradigmfoundation/paradigmcore/blob/6f2b1c7/src/core/handlers/rebalance.ts#L34)*

Verify a Rebalance proposal before accepting it into the local mempool.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedRebalanceTx` |  decoded transaction body |
| state | `State` |  current round state |

**Returns:** `ResponseCheckTx`

___
<a id="deliverrebalance"></a>

###  deliverRebalance

▸ **deliverRebalance**(tx: *`SignedRebalanceTx`*, state: *`State`*): `ResponseDeliverTx`

*Defined in [core/handlers/rebalance.ts:69](https://github.com/paradigmfoundation/paradigmcore/blob/6f2b1c7/src/core/handlers/rebalance.ts#L69)*

Execute a Rebalance transaction and adopt the new mapping in state.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedRebalanceTx` |  decoded transaction body |
| state | `State` |  current round state |

**Returns:** `ResponseDeliverTx`

___

