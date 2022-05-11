import {LOGIN_BY_USERNAME, SET_LAYOUT_LANGUAGE} from "../actions/LayoutAction";
import {actionType} from "../reduxInterfaces";

const initialState = {
    language: 'en',
    username:'',
    password:'',
    token:'',
};


const sampleReducer = (state = initialState, {payload,type}:actionType) => {
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
        default:
            return state;
    }
};

export default sampleReducer;
