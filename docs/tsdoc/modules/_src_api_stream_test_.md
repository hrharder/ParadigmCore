[paradigm-contracts](../README.md) > ["src/api/stream/test"](../modules/_src_api_stream_test_.md)

# External module: "src/api/stream/test"

## Index

### Object literals

* [test](_src_api_stream_test_.md#test)

---

## Object literals

<a id="test"></a>

### `<Const>` test

**test**: *`object`*

*Defined in [src/api/stream/test.ts:1](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L1)*

<a id="test.codes"></a>

####  codes

**codes**: *`object`*

*Defined in [src/api/stream/test.ts:74](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L74)*

<a id="test.codes._32600"></a>

####  -32600

**-32600**: *`object`*

*Defined in [src/api/stream/test.ts:79](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L79)*

<a id="test.codes._32600.info"></a>

####  info

**● info**: *`string`* = "Invalid request: "

*Defined in [src/api/stream/test.ts:81](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L81)*

___
<a id="test.codes._32600.name"></a>

####  name

**● name**: *`string`* = "REQUEST"

*Defined in [src/api/stream/test.ts:80](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L80)*

___

___
<a id="test.codes._32601"></a>

####  -32601

**-32601**: *`object`*

*Defined in [src/api/stream/test.ts:83](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L83)*

<a id="test.codes._32601.info-1"></a>

####  info

**● info**: *`string`* = "Method not found: "

*Defined in [src/api/stream/test.ts:85](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L85)*

___
<a id="test.codes._32601.name-1"></a>

####  name

**● name**: *`string`* = "METHOD"

*Defined in [src/api/stream/test.ts:84](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L84)*

___

___
<a id="test.codes._32602"></a>

####  -32602

**-32602**: *`object`*

*Defined in [src/api/stream/test.ts:87](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L87)*

<a id="test.codes._32602.info-2"></a>

####  info

**● info**: *`string`* = "Invalid param: "

*Defined in [src/api/stream/test.ts:89](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L89)*

___
<a id="test.codes._32602.name-2"></a>

####  name

**● name**: *`string`* = "PARAM"

*Defined in [src/api/stream/test.ts:88](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L88)*

___

___
<a id="test.codes._32603"></a>

####  -32603

**-32603**: *`object`*

*Defined in [src/api/stream/test.ts:91](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L91)*

<a id="test.codes._32603.info-3"></a>

####  info

**● info**: *`string`* = "Internal error: please try again later."

*Defined in [src/api/stream/test.ts:93](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L93)*

___
<a id="test.codes._32603.name-3"></a>

####  name

**● name**: *`string`* = "INTERNAL"

*Defined in [src/api/stream/test.ts:92](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L92)*

___

___
<a id="test.codes._32700"></a>

####  -32700

**-32700**: *`object`*

*Defined in [src/api/stream/test.ts:75](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L75)*

<a id="test.codes._32700.info-4"></a>

####  info

**● info**: *`string`* = "Parse error: "

*Defined in [src/api/stream/test.ts:77](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L77)*

___
<a id="test.codes._32700.name-4"></a>

####  name

**● name**: *`string`* = "PARSE"

*Defined in [src/api/stream/test.ts:76](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L76)*

___

___

___
<a id="test.request"></a>

####  request

**request**: *`object`*

*Defined in [src/api/stream/test.ts:2](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L2)*

<a id="test.request.methods"></a>

####  methods

**● methods**: *`object`[]* =  [
            {
                "name": "subscribe",
                "description": "Subscribe to a specific event in the blockchain.",
                "params": [
                    {
                        "key": "event",
                        "required": true,
                        "type": "string",
                        "valRegEx": null,
                        "valArr": [
                            "newOrder",
                            "newBlock",
                            "newRates"
                        ],
                        "errCode": "-32602",
                        "errInfo":  "missing or invalid value for 'event'."
                    },
                    {
                        "key": "filter",
                        "required": false,
                        "type": "object",
                        "valRegEx": null,
                        "valArr": null,
                        "errCode": "-32602",
                        "errInfo":  "mutated or invalid value for 'filter'."
                    }
                ]
            }
        ]

*Defined in [src/api/stream/test.ts:43](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L43)*

___
<a id="test.request.properties"></a>

####  properties

**● properties**: *(`object` \| `object`)[]* =  [
            {
                "key": "jsonrpc",
                "required": true,
                "type": "string",
                "valRegEx": "^2\\.0$",
                "valArr": null,
                "errCode": "-32600",
                "errInfo":  "JSONRPC version string must be exactly '2.0'."
            },
            {
                "key": "id",
                "required": true,
                "type": "string",
                "valRegEx": "^[a-zA-Z0-9]{1,32}$",
                "valArr": null,
                "errCode": "-32600",
                "errInfo":  "the 'id' string must be alphanumeric, sub 32 chars."
            },
            {
                "key": "method",
                "required": true,
                "type": "string",
                "valRegEx": null,
                "valArr": [
                    "subscribe"
                ],
                "errCode": "-32600",
                "errInfo":  "invalid or unknown method."
            },
            {
                "key": "params",
                "required": true,
                "type": "object",
                "valRegEx": null,
                "valArr": null,
                "errCode": "-32600",
                "errInfo":  "invalid params, see specific errors."
            }
        ]

*Defined in [src/api/stream/test.ts:3](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/api/stream/test.ts#L3)*

___

___

___

