export const test: IStreamAPI = {
    "request": {
        "properties": [
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
        ],
        "methods": [
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
    },
    "codes": {
        "-32700": {
            "name": "PARSE",
            "info": "Parse error: "
        },
        "-32600": {
            "name": "REQUEST",
            "info": "Invalid request: "
        },
        "-32601": {
            "name": "METHOD",
            "info": "Method not found: "
        },
        "-32602": {
            "name": "PARAM",
            "info": "Invalid param: "
        },
        "-32603": {
            "name": "INTERNAL",
            "info": "Internal error: please try again later."
        }
    }
}