
export interface actionType{
    type:string;
    payload:any;
}

export interface loginActionParams{
    username:string;
    password:string;
    token:string;
}
export interface storeTypes{
    layout:{
        language:string;
        username:string;
        password:string;
        token:string;
    }
}
