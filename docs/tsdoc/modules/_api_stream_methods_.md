[ParadigmCore](../README.md) > ["api/stream/methods"](../modules/_api_stream_methods_.md)

# External module: "api/stream/methods"

## Index

### Object literals

* [methods](_api_stream_methods_.md#methods)

---

## Object literals

<a id="methods"></a>

### `<Const>` methods

**methods**: *`object`*

*Defined in [api/stream/methods.ts:25](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/api/stream/methods.ts#L25)*

Method implementations for the JSONRPC StreamAPI server (StreamServer)

<a id="methods.session_end"></a>

####  session.end

▸ **session.end**(server: *[StreamServer](../classes/_api_stream_streamserver_.streamserver.md)*, client: *`WebSocket`*, req: *[Request](../classes/_api_stream_request_.request.md)*): `Promise`<`void`>

*Defined in [api/stream/methods.ts:26](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/api/stream/methods.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| server | [StreamServer](../classes/_api_stream_streamserver_.streamserver.md) |
| client | `WebSocket` |
| req | [Request](../classes/_api_stream_request_.request.md) |

**Returns:** `Promise`<`void`>

___
<a id="methods.state_latestheight"></a>

####  state.latestHeight

▸ **state.latestHeight**(server: *[StreamServer](../classes/_api_stream_streamserver_.streamserver.md)*, client: *`WebSocket`*, req: *[Request](../classes/_api_stream_request_.request.md)*): `Promise`<[Response](../classes/_api_stream_response_.response.md)>

*Defined in [api/stream/methods.ts:68](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/api/stream/methods.ts#L68)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| server | [StreamServer](../classes/_api_stream_streamserver_.streamserver.md) |
| client | `WebSocket` |
| req | [Request](../classes/_api_stream_request_.request.md) |

**Returns:** `Promise`<[Response](../classes/_api_stream_response_.response.md)>

___
<a id="methods.state_query"></a>

####  state.query

▸ **state.query**(server: *[StreamServer](../classes/_api_stream_streamserver_.streamserver.md)*, client: *`WebSocket`*, req: *[Request](../classes/_api_stream_request_.request.md)*): `Promise`<[Response](../classes/_api_stream_response_.response.md)>

*Defined in [api/stream/methods.ts:80](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/api/stream/methods.ts#L80)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| server | [StreamServer](../classes/_api_stream_streamserver_.streamserver.md) |
| client | `WebSocket` |
| req | [Request](../classes/_api_stream_request_.request.md) |

**Returns:** `Promise`<[Response](../classes/_api_stream_response_.response.md)>

___
<a id="methods.subscription_end"></a>

####  subscription.end

▸ **subscription.end**(server: *[StreamServer](../classes/_api_stream_streamserver_.streamserver.md)*, client: *`WebSocket`*, req: *[Request](../classes/_api_stream_request_.request.md)*): `Promise`<[Response](../classes/_api_stream_response_.response.md)>

*Defined in [api/stream/methods.ts:49](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/api/stream/methods.ts#L49)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| server | [StreamServer](../classes/_api_stream_streamserver_.streamserver.md) |
| client | `WebSocket` |
| req | [Request](../classes/_api_stream_request_.request.md) |

**Returns:** `Promise`<[Response](../classes/_api_stream_response_.response.md)>

___
<a id="methods.subscription_start"></a>

####  subscription.start

▸ **subscription.start**(server: *[StreamServer](../classes/_api_stream_streamserver_.streamserver.md)*, client: *`WebSocket`*, req: *[Request](../classes/_api_stream_request_.request.md)*): `Promise`<[Response](../classes/_api_stream_response_.response.md)>

*Defined in [api/stream/methods.ts:30](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/api/stream/methods.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| server | [StreamServer](../classes/_api_stream_streamserver_.streamserver.md) |
| client | `WebSocket` |
| req | [Request](../classes/_api_stream_request_.request.md) |

**Returns:** `Promise`<[Response](../classes/_api_stream_response_.response.md)>

___

___

