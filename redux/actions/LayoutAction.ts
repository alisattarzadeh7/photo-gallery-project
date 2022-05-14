import { AnyAction, Dispatch } from 'redux';
import { loginActionParams } from '../reduxInterfaces';
import { store } from '../store';

export const SET_LAYOUT_LANGUAGE: string = 'SET_LAYOUT_LANGUAGE';
export const LOGIN_BY_USERNAME: string = 'LOGIN_BY_USERNAME';
export const LOG_OUT: string = 'LOG_OUT';

export const setLayoutLanguage = (language: string) => (dispatch:any) => dispatch({
            type: SET_LAYOUT_LANGUAGE,
            payload: language,
        });

export const loginByUsername = (userInfo: loginActionParams) => (dispatch:Dispatch<AnyAction>) => {
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1000 * 36000;
    now.setTime(expireTime);
    document.cookie = `username=${userInfo.username};expires=${now.toUTCString()};path=/`;
    document.cookie = `password=${userInfo.password};expires=${now.toUTCString()};path=/`;

    return dispatch({
        type: LOGIN_BY_USERNAME,
        payload: userInfo,
    });
};

export const logout = () => (dispatch:Dispatch<AnyAction>) => {
    document.cookie = `username=${store.getState().layout.username};max-age=0;path=/`;
    document.cookie = `password=${store.getState().layout.password};max-age=0;path=/`;
    dispatch({
        type: LOG_OUT,
    });
};
