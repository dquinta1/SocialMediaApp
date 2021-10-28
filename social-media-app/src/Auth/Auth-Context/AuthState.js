import React, { useEffect, useReducer } from 'react';
import AuthContext from './AuthContext';
import authReducer from './auth-reducer';
import { fakeSignIn, fakeSignUp, fakeSignOut } from '../../Common/APIUtils';
import {
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP
} from './auth-actions';

const AuthState = (props) => {
    // using local storage to cache auth'd user
    var store = require('store');

    // initialize auth state (check if a token is cached) 
    const initialState = {
        // { token: boolean, id: Number } (eventually token will hold an actual token)
        auth: (typeof(store.get('auth')) !== typeof(undefined))  
        ? store.get('auth') 
        : { token: false, id: undefined },
    };

    // configure state management 
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Sign In with username and password
    const signInWithUsernameAndPassword = async (username, password) => {
        const {token, id} = await fakeSignIn(username, password);
        
        console.log('awaited response token: ', token);

        dispatch({
            type: SIGN_IN,
            payload: [token, id],
        });

        console.log('AuthState', state.auth);

        return token;
    };

    // Sign Up with username and password
    const signUpWithUsernameAndPassword = (user) => {
        const { token, id } = fakeSignUp(user);

        dispatch({
            type: SIGN_UP,
            payload: [token, id],
        });
    };

    // Sign Out
    const signOut = () => {
        fakeSignOut(state.auth.token);

        dispatch({
            type: SIGN_OUT,
        });
    };

    // update local storage 
    useEffect(() => {
        store.set('auth', state.auth);
    }, [state.auth]);

    return (
        <AuthContext.Provider
            value={{
                auth: state.auth,
                signInWithUsernameAndPassword,
                signUpWithUsernameAndPassword,
                signOut,
            }}
        >
            { props.children }
        </AuthContext.Provider>
    );
}

export default AuthState;
