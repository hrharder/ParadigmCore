[ParadigmCore](../README.md) > ["core/query"](../modules/_core_query_.md)

# External module: "core/query"

## Index

### Functions

* [queryWrapper](_core_query_.md#querywrapper)

---

## Functions

<a id="querywrapper"></a>

###  queryWrapper

▸ **queryWrapper**(state: *[State](../classes/_state_state_.state.md)*): `function`

*Defined in [core/query.ts:33](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/query.ts#L33)*

Return information about the state and software.

The `request.path` field is used to direct a query towards a particular state object. Currently, query requests can return information about

*__todo__*: parse path, support multiple query paths and options, util functions for buffering req/res objects

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [State](../classes/_state_state_.state.md) |

**Returns:** `function`

___

