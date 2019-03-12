[ParadigmCore](../README.md) > ["api/stream/StreamServer"](../modules/_api_stream_streamserver_.md) > [IOptions](../interfaces/_api_stream_streamserver_.ioptions.md)

# Interface: IOptions

Defines the object provided to the `StreamServer` constructor.

## Hierarchy

**IOptions**

## Index

### Properties

* [host](_api_stream_streamserver_.ioptions.md#host)
* [methods](_api_stream_streamserver_.ioptions.md#methods)
* [port](_api_stream_streamserver_.ioptions.md#port)
* [retryInterval](_api_stream_streamserver_.ioptions.md#retryinterval)
* [retryMax](_api_stream_streamserver_.ioptions.md#retrymax)
* [tendermintRpcUrl](_api_stream_streamserver_.ioptions.md#tendermintrpcurl)

---

## Properties

<a id="host"></a>

### `<Optional>` host

**● host**: *`string`*

*Defined in [api/stream/StreamServer.ts:49](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/api/stream/StreamServer.ts#L49)*

Network host to bind StreamAPI server.

___
<a id="methods"></a>

### `<Optional>` methods

**● methods**: *`object`*

*Defined in [api/stream/StreamServer.ts:52](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/api/stream/StreamServer.ts#L52)*

Optional pre-defined method implementations.

#### Type declaration

[name: `string`]: `function`

▸(server: *[StreamServer](../classes/_api_stream_streamserver_.streamserver.md)*, client: *`WebSocket`*, params: *`any`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| server | [StreamServer](../classes/_api_stream_streamserver_.streamserver.md) |
| client | `WebSocket` |
| params | `any` |

**Returns:** `any`

___
<a id="port"></a>

### `<Optional>` port

**● port**: *`number`*

*Defined in [api/stream/StreamServer.ts:46](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/api/stream/StreamServer.ts#L46)*

Port to bind the StreamAPI server to.

___
<a id="retryinterval"></a>

### `<Optional>` retryInterval

**● retryInterval**: *`number`*

*Defined in [api/stream/StreamServer.ts:40](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/api/stream/StreamServer.ts#L40)*

Interval between connection attempts (in ms).

___
<a id="retrymax"></a>

### `<Optional>` retryMax

**● retryMax**: *`number`*

*Defined in [api/stream/StreamServer.ts:43](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/api/stream/StreamServer.ts#L43)*

The maximum number of times to retry connection before throwing.

___
<a id="tendermintrpcurl"></a>

### `<Optional>` tendermintRpcUrl

**● tendermintRpcUrl**: *`string`*

*Defined in [api/stream/StreamServer.ts:37](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/api/stream/StreamServer.ts#L37)*

URL of the local Tendermint RPC server.

___

