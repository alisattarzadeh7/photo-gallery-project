import {loginActionParams} from "../reduxInterfaces";

export const SET_LAYOUT_LANGUAGE: string = 'SET_LAYOUT_LANGUAGE';
export const LOGIN_BY_USERNAME: string = 'LOGIN_BY_USERNAME';


export const setLayoutLanguage = (language: string)=>async (dispatch:any) =>
        dispatch({
            type: SET_LAYOUT_LANGUAGE,
            payload: language,
        });

export const loginByUsername = (userInfo: loginActionParams)=>async (dispatch:any) =>
        dispatch({
            type: LOGIN_BY_USERNAME,
            payload: userInfo,
        });