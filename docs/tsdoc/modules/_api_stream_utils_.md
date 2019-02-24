[ParadigmCore](../README.md) > ["api/stream/utils"](../modules/_api_stream_utils_.md)

# External module: "api/stream/utils"

## Index

### Functions

* [createResponse](_api_stream_utils_.md#createresponse)
* [createValError](_api_stream_utils_.md#createvalerror)
* [validateMessage](_api_stream_utils_.md#validatemessage)

---

## Functions

<a id="createresponse"></a>

###  createResponse

▸ **createResponse**(result?: *`any`*, id?: *`string`*, error?: *`ValidationError`*): `Res`

*Defined in [api/stream/utils.ts:71](https://github.com/paradigmfoundation/paradigmcore/blob/24132f3/src/api/stream/utils.ts#L71)*

Generate a JSONRPC response.

Builds a successful (or failure) JSONRPC server -> client response object based on the provided inputs. If a code is provided, and the `id` is `null`, the response will be an error response. If an `id` and `result` are provided, with no error code, a successful response object will be generated.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` result | `any` |  an error message or successful API request result |
| `Optional` id | `string` |  the client-provided ID string, only included for non-errors |
| `Optional` error | `ValidationError` |

**Returns:** `Res`

___
<a id="createvalerror"></a>

###  createValError

▸ **createValError**(code: *`number`*, message: *`string`*): `ValidationError`

*Defined in [api/stream/utils.ts:51](https://github.com/paradigmfoundation/paradigmcore/blob/24132f3/src/api/stream/utils.ts#L51)*

Build a JSONRPC validation object.

*__todo__*: pull error message from code -> message mapping

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| code | `number` |  the JSONRPC error code (see JSONRPC-2.0 specification) |
| message | `string` |  the error message to be included in the error object |

**Returns:** `ValidationError`

___
<a id="validatemessage"></a>

###  validateMessage

▸ **validateMessage**(message: *`WebSocket.Data`*): `ValidationError`

*Defined in [api/stream/utils.ts:31](https://github.com/paradigmfoundation/paradigmcore/blob/24132f3/src/api/stream/utils.ts#L31)*

Validate an incoming client message

If the function returns an empty array, assume the input is a valid and parsable JSON string. Use `createRequest` to create a rich Request object.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| message | `WebSocket.Data` |  data from the WebSocket client connection |

**Returns:** `ValidationError`

___

