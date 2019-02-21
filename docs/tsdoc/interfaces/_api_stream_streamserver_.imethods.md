[ParadigmCore](../README.md) > ["api/stream/StreamServer"](../modules/_api_stream_streamserver_.md) > [IMethods](../interfaces/_api_stream_streamserver_.imethods.md)

# Interface: IMethods

Mapping of methods to method implementations.

The `this` arg for the active [StreamServer](../classes/_api_stream_streamserver_.streamserver.md) instance is passed into all bound methods, so they may access instance data, such as the current block info, etc.

*__todo__*: examine if a better structure is needed

## Hierarchy

**IMethods**

## Indexable

\[methodName: `string`\]:&nbsp;`function`
Mapping of methods to method implementations.

The `this` arg for the active [StreamServer](../classes/_api_stream_streamserver_.streamserver.md) instance is passed into all bound methods, so they may access instance data, such as the current block info, etc.

▸(_this: *[StreamServer](../classes/_api_stream_streamserver_.streamserver.md)*, params: *`any`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _this | [StreamServer](../classes/_api_stream_streamserver_.streamserver.md) |
| params | `any` |

**Returns:** `any`

## Index

---

