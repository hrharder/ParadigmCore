interface ClientMap extends Object {
    [id: string]: Client;
}

// @todo improve
interface Client {
    [key: string]: any
} 


type ConnectionMap = {
    [id: string]: any;
}

interface IResponseOptions {
    id?: string;
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
    description?:    string;
    params:         IRequestProperty[];
}

interface ValidationError {
    code:       number;
    message:    string;
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

interface IJsonResponse {
    jsonrpc: string;
    id: string,
    error?: ValidationError;
    result?: any;
}

// STREAM SCHEMA
interface IStreamSchema {
    $schema: string;
    jrgen: string;
    jsonrpc: string;
    info: ISchemaInfo;
    definitions: IDefinitions;
    methods: ISchemaMethods;
}

interface ISchemaInfo {
    title: string;
    description: string | string[];
    version: string;
}

interface IDefinitions {
    [name: string]: IDefinition;
}

interface IDefinition {
    type: string;
    properties: ISchemaProperties;
    required: string[];
}

interface ISchemaProperties {
    [name: string]: ISchemaProperty;
}

interface ISchemaProperty {
    description: string;
    default: any;
    type: string;
    minLength?: number;
    maxLength?: number;
    enum?: any[];
}

interface ISchemaMethods {
    [name: string]: ISchemaMethod;
}

interface ISchemaMethod {
    summary: string;
    description: string | string[];
    tags: string[];
    result: IDefinition;
    params?: IDefinition;
    errors: IErrorDefinition[];
}

interface IErrorDefinition {
    description: string;
    code: number;
    message: string,
    data: any;
}