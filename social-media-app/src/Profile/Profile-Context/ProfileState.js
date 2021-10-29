import React, { useContext, useReducer } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { requestUser } from '../../Common/APIUtils';
import { EDIT_PROFILE, EDIT_AVATAR } from './profile-actions';
import profileReducer from './profile-reducer';
import ProfileContext from './ProfileContext';

const ProfileState = (props) => {

    // using local storage
    var store = require('store');

    // initially undefined
    const initialState = {
        user: undefined,
    }

    // configure state management
    const [state, dispatch] = useReducer(profileReducer, initialState);

    console.log('state', state);

    // Edit user when Profile is edited
    const editProfile = (user) => {
        dispatch({
            action: EDIT_PROFILE,
            payload: user,
        });
    },

    // Edit Avatar's source when new pic uploaded
    const editAvatar = (src) => {
        dispatch({
            action: EDIT_AVATAR,
            payload: src,
        });
    };

    // get auth'd user from DB
    useEffect( async () => {
        const loadedUser = await requestUser(id);
        editProfile(loadedUser);
    }, []);

    // // update local storage on state change (next phase update on DB)
    // useEffect(() => {
    //     store.set('user', state.user);
    // }, []);

    return (
        <ProfileContext.Provider 
            value={{
                user: state.user,
                editProfile,
                editAvatar,
            }}
        >
            { props.children }
        </ProfileContext.Provider>
    )
}

export default ProfileState
