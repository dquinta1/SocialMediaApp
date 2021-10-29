import { EDIT_PROFILE, EDIT_AVATAR } from './profile-actions';

const profileReducer = (state, action) => {
    switch (action.type) {
        case EDIT_PROFILE:
            return {
                ...state, 
                user: action.payload,
            };
        case EDIT_AVATAR:
            return {
                ...state,
                user: {...state.user, src: action.payload}
            };
        default:
            return state;
    }
};

export default profileReducer;