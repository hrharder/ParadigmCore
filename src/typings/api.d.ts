interface StreamApiDefs {
    methods: MethodDefs;
}

interface MethodDefs {
    [name: string]: MethodDef;
}

interface MethodDef {
    request: RequestDef;
    response: ResponseDef;
}

interface RequestDef {
    params: RequestParam[];
}

interface ResponseDef {
    ok: OkResponseDef;
    fail: FailResponseDef;
}

interface RequestParam {
    name: string;
    required: boolean;
    type: string;
    options: string[] | ReqParamOption[];
    default?: string;
}

interface ReqParamOption {
    key: string;
    valRegEx?: string;
}

interface ResParamOption {
    key: string;
    valType?: string;
}

interface OkResponseDef {
    result: ResultDefs;
}

interface ResultDefs {
    [name: string]: ResultDef;
}

interface ResultDef {
    type: string;
    options?: string[] | ResParamOption[];
}

interface FailResponseDef {
    error: ErrorDefs;
}

interface ErrorDefs {
    code: ResultDef,
    message: ResultDef;
}