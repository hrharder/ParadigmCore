[paradigm-contracts](../README.md) > ["src/api/post/HttpMessage"](../modules/_src_api_post_httpmessage_.md) > [HttpMessage](../classes/_src_api_post_httpmessage_.httpmessage.md)

# Class: HttpMessage

Represents response message for HTTP (post) API requests.

## Hierarchy

**HttpMessage**

## Index

### Constructors

* [constructor](_src_api_post_httpmessage_.httpmessage.md#constructor)

### Properties

* [err](_src_api_post_httpmessage_.httpmessage.md#err)
* [json](_src_api_post_httpmessage_.httpmessage.md#json)
* [msg](_src_api_post_httpmessage_.httpmessage.md#msg)
* [res](_src_api_post_httpmessage_.httpmessage.md#res)

### Methods

* [send](_src_api_post_httpmessage_.httpmessage.md#send)
* [toJSON](_src_api_post_httpmessage_.httpmessage.md#tojson)
* [staticSend](_src_api_post_httpmessage_.httpmessage.md#staticsend)
* [staticSendError](_src_api_post_httpmessage_.httpmessage.md#staticsenderror)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new HttpMessage**(response: *`exp.Response`*, message: *`string`*, error: *`number`*): [HttpMessage](_src_api_post_httpmessage_.httpmessage.md)

*Defined in [src/api/post/HttpMessage.ts:55](https://github.com/paradigmfoundation/paradigmcore/blob/673c168/src/api/post/HttpMessage.ts#L55)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| response | `exp.Response` |
| message | `string` |
| error | `number` |

**Returns:** [HttpMessage](_src_api_post_httpmessage_.httpmessage.md)

___

## Properties

<a id="err"></a>

### `<Private>` err

**● err**: *`number`*

*Defined in [src/api/post/HttpMessage.ts:52](https://github.com/paradigmfoundation/paradigmcore/blob/673c168/src/api/post/HttpMessage.ts#L52)*

___
<a id="json"></a>

### `<Private>` json

**● json**: *`object`*

*Defined in [src/api/post/HttpMessage.ts:54](https://github.com/paradigmfoundation/paradigmcore/blob/673c168/src/api/post/HttpMessage.ts#L54)*

___
<a id="msg"></a>

### `<Private>` msg

**● msg**: *`string`*

*Defined in [src/api/post/HttpMessage.ts:53](https://github.com/paradigmfoundation/paradigmcore/blob/673c168/src/api/post/HttpMessage.ts#L53)*

___
<a id="res"></a>

### `<Private>` res

**● res**: *`exp.Response`*

*Defined in [src/api/post/HttpMessage.ts:55](https://github.com/paradigmfoundation/paradigmcore/blob/673c168/src/api/post/HttpMessage.ts#L55)*

___

## Methods

<a id="send"></a>

###  send

▸ **send**(): `void`

*Defined in [src/api/post/HttpMessage.ts:69](https://github.com/paradigmfoundation/paradigmcore/blob/673c168/src/api/post/HttpMessage.ts#L69)*

**Returns:** `void`

___
<a id="tojson"></a>

###  toJSON

▸ **toJSON**(): `object`

*Defined in [src/api/post/HttpMessage.ts:77](https://github.com/paradigmfoundation/paradigmcore/blob/673c168/src/api/post/HttpMessage.ts#L77)*

**Returns:** `object`

___
<a id="staticsend"></a>

### `<Static>` staticSend

▸ **staticSend**(res: *`exp.Response`*, message: *`string`*): `void`

*Defined in [src/api/post/HttpMessage.ts:37](https://github.com/paradigmfoundation/paradigmcore/blob/673c168/src/api/post/HttpMessage.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| res | `exp.Response` |
| message | `string` |

**Returns:** `void`

___
<a id="staticsenderror"></a>

### `<Static>` staticSendError

▸ **staticSendError**(res: *`exp.Response`*, message: *`string`*, error: *`number`*): `void`

*Defined in [src/api/post/HttpMessage.ts:23](https://github.com/paradigmfoundation/paradigmcore/blob/673c168/src/api/post/HttpMessage.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| res | `exp.Response` |
| message | `string` |
| error | `number` |

**Returns:** `void`

___

