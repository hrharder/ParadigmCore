interface StreamServerOptions {
    abciURL: string;
    maxRetry: number;
    port: number;
    host?: string;
}

interface ClientMap {
    [id: string]: Client;
}

interface Client {} 

interface IResponseOptions {
    id: string;
    result?: any;
    error?: any;
}

// STREAM API DEFS BELOW

interface IStreamAPI {
    request?: IStreamRequest;
    // response?: IStreamResponse;
    codes:  ICodes;
}

interface IStreamRequest {
    properties: IRequestProperty[];
    methods:    IRequestMethod[];
}

interface IRequestProperty {
    key:        string;
    required:   boolean;
    type:       string;
    errCode:    string;
    errInfo:    string;
    valRegEx:   string;
    valArr:     string[];
}

interface IRequestMethod {
    name:           string;
    description:    string;
    params:         IRequestProperty[];
}

interface ValidationError {
    code:   string;
    message:   string;
}

interface IParsedRequest {
    jsonrpc:    string;
    id:         string;
    method:     string;
    params:     IParam;
}

interface IParam {
    [key: string]: any;
}

interface ICodes {
    [code: string]: ICodeInfo;
}

interface ICodeInfo {
    name: string;
    info: string;
}