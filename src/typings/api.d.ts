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
    info:   string;
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
    [name: string]: ICodeInfo;
}

interface ICodeInfo {
    code: string;
    info: string;
}