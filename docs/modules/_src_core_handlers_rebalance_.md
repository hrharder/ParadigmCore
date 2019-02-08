[paradigm-contracts](../README.md) > ["src/core/handlers/rebalance"](../modules/_src_core_handlers_rebalance_.md)

# External module: "src/core/handlers/rebalance"

## Index

### Functions

* [checkRebalance](_src_core_handlers_rebalance_.md#checkrebalance)
* [deliverRebalance](_src_core_handlers_rebalance_.md#deliverrebalance)

---

## Functions

<a id="checkrebalance"></a>

###  checkRebalance

▸ **checkRebalance**(tx: *`SignedRebalanceTx`*, state: *`State`*): `object`

*Defined in [src/core/handlers/rebalance.ts:34](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/core/handlers/rebalance.ts#L34)*

Verify a Rebalance proposal before accepting it into the local mempool.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedRebalanceTx` |  decoded transaction body |
| state | `State` |  current round state |

**Returns:** `object`

___
<a id="deliverrebalance"></a>

###  deliverRebalance

▸ **deliverRebalance**(tx: *`SignedRebalanceTx`*, state: *`State`*): `object`

*Defined in [src/core/handlers/rebalance.ts:69](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/core/handlers/rebalance.ts#L69)*

Execute a Rebalance transaction and adopt the new mapping in state.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedRebalanceTx` |  decoded transaction body |
| state | `State` |  current round state |

**Returns:** `object`

___

