[ParadigmCore](../README.md) > ["core/endBlock"](../modules/_core_endblock_.md)

# External module: "core/endBlock"

## Index

### Functions

* [endBlockWrapper](_core_endblock_.md#endblockwrapper)

---

## Functions

<a id="endblockwrapper"></a>

###  endBlockWrapper

▸ **endBlockWrapper**(state: *`IState`*): `function`

*Defined in [core/endBlock.ts:26](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/core/endBlock.ts#L26)*

Implementation of the ABCI `EndBlock` method. Will enable dynamic updates to the active validator set based on the state of the ValidatorRegistry smart contract. Currently disabled/incomplete.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `IState` |  the current deliverState object |

**Returns:** `function`

___

