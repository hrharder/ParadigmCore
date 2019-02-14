[ParadigmCore](../README.md) > ["core/handlers/witness"](../modules/_core_handlers_witness_.md)

# External module: "core/handlers/witness"

## Index

### Functions

* [checkWitness](_core_handlers_witness_.md#checkwitness)
* [deliverWitness](_core_handlers_witness_.md#deliverwitness)

---

## Functions

<a id="checkwitness"></a>

###  checkWitness

▸ **checkWitness**(tx: *`SignedWitnessTx`*, state: *`State`*): [Vote](../classes/_core_util_vote_.vote.md)

*Defined in [core/handlers/witness.ts:37](https://github.com/paradigmfoundation/paradigmcore/blob/838c6d3/src/core/handlers/witness.ts#L37)*

Performs mempool verification of Ethereum StakeEvent transactions. Condition for validity is purely structural. I.E. are all necessary parameters present?

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedWitnessTx` |  decoded transaction body |
| state | `State` |  current round state |

**Returns:** [Vote](../classes/_core_util_vote_.vote.md)

___
<a id="deliverwitness"></a>

###  deliverWitness

▸ **deliverWitness**(tx: *`SignedWitnessTx`*, state: *`State`*): [Vote](../classes/_core_util_vote_.vote.md)

*Defined in [core/handlers/witness.ts:55](https://github.com/paradigmfoundation/paradigmcore/blob/838c6d3/src/core/handlers/witness.ts#L55)*

Performs state modification of Stake Event transactions (modify staker's balance).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedWitnessTx` |  decoded transaction body |
| state | `State` |  current round state |

**Returns:** [Vote](../classes/_core_util_vote_.vote.md)

___

