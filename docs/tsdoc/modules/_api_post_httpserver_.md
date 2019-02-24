[ParadigmCore](../README.md) > ["api/post/HttpServer"](../modules/_api_post_httpserver_.md)

# External module: "api/post/HttpServer"

## Index

### Variables

* [app](_api_post_httpserver_.md#app)
* [client](_api_post_httpserver_.md#client)
* [generator](_api_post_httpserver_.md#generator)

### Functions

* [errorHandler](_api_post_httpserver_.md#errorhandler)
* [postHandler](_api_post_httpserver_.md#posthandler)
* [start](_api_post_httpserver_.md#start)

---

## Variables

<a id="app"></a>

### `<Let>` app

**● app**: *`Express`* =  express()

*Defined in [api/post/HttpServer.ts:38](https://github.com/paradigmfoundation/paradigmcore/blob/5599f72/src/api/post/HttpServer.ts#L38)*

___
<a id="client"></a>

### `<Let>` client

**● client**: *[TxBroadcaster](../classes/_core_util_txbroadcaster_.txbroadcaster.md)*

*Defined in [api/post/HttpServer.ts:36](https://github.com/paradigmfoundation/paradigmcore/blob/5599f72/src/api/post/HttpServer.ts#L36)*

___
<a id="generator"></a>

### `<Let>` generator

**● generator**: *[TxGenerator](../classes/_core_util_txgenerator_.txgenerator.md)*

*Defined in [api/post/HttpServer.ts:37](https://github.com/paradigmfoundation/paradigmcore/blob/5599f72/src/api/post/HttpServer.ts#L37)*

___

## Functions

<a id="errorhandler"></a>

###  errorHandler

▸ **errorHandler**(error: *`Error`*, req: *`Request`*, res: *`Response`*, next: *`NextFunction`*): `void`

*Defined in [api/post/HttpServer.ts:105](https://github.com/paradigmfoundation/paradigmcore/blob/5599f72/src/api/post/HttpServer.ts#L105)*

General error handler.

**Parameters:**

| Name | Type |
| ------ | ------ |
| error | `Error` |
| req | `Request` |
| res | `Response` |
| next | `NextFunction` |

**Returns:** `void`

___
<a id="posthandler"></a>

###  postHandler

▸ **postHandler**(req: *`Request`*, res: *`Response`*, next: *`NextFunction`*): `Promise`<`void`>

*Defined in [api/post/HttpServer.ts:91](https://github.com/paradigmfoundation/paradigmcore/blob/5599f72/src/api/post/HttpServer.ts#L91)*

Express POST handler for incoming orders (and eventually stream tx's).

**Parameters:**

| Name | Type |
| ------ | ------ |
| req | `Request` |
| res | `Response` |
| next | `NextFunction` |

**Returns:** `Promise`<`void`>

___
<a id="start"></a>

###  start

▸ **start**(options: *`any`*): `Promise`<`void`>

*Defined in [api/post/HttpServer.ts:51](https://github.com/paradigmfoundation/paradigmcore/blob/5599f72/src/api/post/HttpServer.ts#L51)*

Start and bind API server.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | `any` |  options object with:*   options.broadcaster {TxBroadcaster} transaction broadcaster instance*   options.generator {TxGenerator} validator tx generator instance*   options.paradigm {Paradigm} paradigm-connect instance*   options.port {number} port to bind HTTP server to*   options.rateWindow {number} window (in ms) to rate-limit over*   options.rateMax {number} no. of requests allowed per window |

**Returns:** `Promise`<`void`>

___

