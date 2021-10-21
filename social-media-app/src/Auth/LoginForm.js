import React from 'react';
import auth from './utils/auth';
import MockDB from '../DB/MockDB';
import { Button } from 'antd';
import { loadFollowers, loadPosts, loadUser } from '../DB/utils/store-utils';
import { useState as useHookState } from '@hookstate/core';
import store from '../DB/store';

const LoginForm = ({ history }) => {

    const { user, followers, posts} = useHookState(store); 

    let db = MockDB();
    let username = document.getElementById('username');
    let password = document.getElementById('password');

    let login = () => {
        auth.login(() => {
            let data = db.users.data;
            let iDs = db.iDs.data;
            let postsData = db.posts.data;
            let message = 'Invalid credentials';

            if (username.value in data) {
                if (data[username.value]['address']['street'] === password.value) {

                    loadUser(username.value, user, data);
                    loadFollowers(data[username.value]['id'], followers, iDs);

                    let ids = [user.get()['id']];
                    for (let index = 0; index < followers.get().length; index++) {
                        const element = followers.get()[index];
                        ids.push(element['id'])
                    }
                    loadPosts(ids, posts, postsData, iDs);

                    history.push('/main');
                    message = '';
                }
            }
            document.getElementById('auth-error-message').innerText = message;
        });
    };

    let signUp = () => {
        history.push('/signup');
    }

    return (
        <div>
            <h1>Landing Page</h1>

            <div className="input-div">
                <label htmlFor="useraname">Username: </label>
                <input type="text" id='username' className="form-input"/>
            </div>

            <div className="input-div">
                <label htmlFor="password">Password: </label>
                <input type="password" id='password' className="form-input"/>
            </div>

            <div className="input-div">
                <Button id='btn-login' className="login-btn" onClick= { login }>
                    Log In
                </Button>
                <Button type='primary' className="signup-btn" onClick= { signUp }>
                    Sign Up
                </Button>
            </div>

            <div id='auth-error-message' className="auth-error-message"></div>
        </div>
    )
}

export default LoginForm
