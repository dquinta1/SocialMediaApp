import {
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP
} from './auth-actions';

const authReducer = (state, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                auth: { 
                    token: action.payload[0], 
                    id: action.payload[1], 
                }
            };
        case SIGN_OUT:
            return {
                ...state, 
                auth: {
                    token: false,
                    id: undefined,
                }
            };
        case SIGN_UP:
            return {
                ...state,
                auth: { 
                    token: action.payload[0], 
                    id: action.payload[1], 
                }
            };
        default:
            return state;
    }
};

export default authReducer;