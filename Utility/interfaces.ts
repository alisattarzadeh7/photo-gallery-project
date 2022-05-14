export interface apiOptions{
    showSuccess?:string,
    showErrors?:boolean,
    returnData?:boolean
}

export interface apiBasicParam{
    url:string,
    params?:any,
    data?:any,
    method:string,
    requestOptions?:any[];
}

export interface layoutReducerTypes {
    layout:{
        language: 'en' | 'fa',
        username: string | null,
        password: string | null,
        token: string | null,
    }
}
