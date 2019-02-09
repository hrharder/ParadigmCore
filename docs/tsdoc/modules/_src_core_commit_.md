[ParadigmCore](../README.md) > ["src/core/commit"](../modules/_src_core_commit_.md)

# External module: "src/core/commit"

## Index

### Functions

* [commitWrapper](_src_core_commit_.md#commitwrapper)

---

## Functions

<a id="commitwrapper"></a>

###  commitWrapper

▸ **commitWrapper**(deliverState: *`State`*, commitState: *`State`*, msg: *`LogTemplates`*, witness: *[Witness](../classes/_src_witness_witness_.witness.md)*): `function`

*Defined in [src/core/commit.ts:33](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/core/commit.ts#L33)*

Persist application state, synchronize commit and deliver states, and trigger the broadcast of valid orders in that block.

**Parameters:**

| Name | Type |
| ------ | ------ |
| deliverState | `State` |
| commitState | `State` |
| msg | `LogTemplates` |
| witness | [Witness](../classes/_src_witness_witness_.witness.md) |

**Returns:** `function`

___

