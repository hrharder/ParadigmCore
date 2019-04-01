[ParadigmCore](../README.md) > ["core/commit"](../modules/_core_commit_.md)

# External module: "core/commit"

## Index

### Functions

* [commitWrapper](_core_commit_.md#commitwrapper)

---

## Functions

<a id="commitwrapper"></a>

###  commitWrapper

▸ **commitWrapper**(deliverState: *[State](../classes/_state_state_.state.md)*, commitState: *[State](../classes/_state_state_.state.md)*): `function`

*Defined in [core/commit.ts:29](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/core/commit.ts#L29)*

Persist application state, synchronize commit and deliver states, and trigger the broadcast of valid orders in that block.

**Parameters:**

| Name | Type |
| ------ | ------ |
| deliverState | [State](../classes/_state_state_.state.md) |
| commitState | [State](../classes/_state_state_.state.md) |

**Returns:** `function`

___

