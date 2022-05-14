import { LOGIN_BY_USERNAME, SET_LAYOUT_LANGUAGE, LOG_OUT } from '../actions/LayoutAction';
import { actionType } from '../reduxInterfaces';

const initialState = {
    language: 'en',
    username: null,
    password: null,
    token: null,
};

const layoutReducer = (state = initialState, { payload, type }: actionType) => {
    switch (type) {
        case SET_LAYOUT_LANGUAGE:
            return {
                ...state,
                language: payload,
            };
        case LOGIN_BY_USERNAME:
            return {
                ...state,
                ...payload,
            };
        case LOG_OUT:
            return {
                ...state,
                username: '',
                password: '',
                token: '',
            };
        default:
            return state;
    }
};

export default layoutReducer;
