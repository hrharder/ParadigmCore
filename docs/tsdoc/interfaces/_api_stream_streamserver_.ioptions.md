[ParadigmCore](../README.md) > ["api/stream/StreamServer"](../modules/_api_stream_streamserver_.md) > [IOptions](../interfaces/_api_stream_streamserver_.ioptions.md)

# Interface: IOptions

Defines the object provided to the `StreamServer` constructor.

## Hierarchy

**IOptions**

## Index

### Properties

* [host](_api_stream_streamserver_.ioptions.md#host)
* [port](_api_stream_streamserver_.ioptions.md#port)
* [retryInterval](_api_stream_streamserver_.ioptions.md#retryinterval)
* [retryMax](_api_stream_streamserver_.ioptions.md#retrymax)
* [tendermintRpcUrl](_api_stream_streamserver_.ioptions.md#tendermintrpcurl)

---

## Properties

<a id="host"></a>

### `<Optional>` host

**● host**: *`string`*

*Defined in [api/stream/StreamServer.ts:51](https://github.com/paradigmfoundation/paradigmcore/blob/486e89a/src/api/stream/StreamServer.ts#L51)*

Network host to bind StreamAPI server.

___
<a id="port"></a>

### `<Optional>` port

**● port**: *`number`*

*Defined in [api/stream/StreamServer.ts:48](https://github.com/paradigmfoundation/paradigmcore/blob/486e89a/src/api/stream/StreamServer.ts#L48)*

Port to bind the StreamAPI server to.

___
<a id="retryinterval"></a>

### `<Optional>` retryInterval

**● retryInterval**: *`number`*

*Defined in [api/stream/StreamServer.ts:42](https://github.com/paradigmfoundation/paradigmcore/blob/486e89a/src/api/stream/StreamServer.ts#L42)*

Interval between connection attempts (in ms).

___
<a id="retrymax"></a>

### `<Optional>` retryMax

**● retryMax**: *`number`*

*Defined in [api/stream/StreamServer.ts:45](https://github.com/paradigmfoundation/paradigmcore/blob/486e89a/src/api/stream/StreamServer.ts#L45)*

The maximum number of times to retry connection before throwing.

___
<a id="tendermintrpcurl"></a>

### `<Optional>` tendermintRpcUrl

**● tendermintRpcUrl**: *`string`*

*Defined in [api/stream/StreamServer.ts:39](https://github.com/paradigmfoundation/paradigmcore/blob/486e89a/src/api/stream/StreamServer.ts#L39)*

URL of the local Tendermint RPC server.

___

