import React from 'react';
import auth from './utils/auth';
import MockDB from '../DB/MockDB';
import { Button } from 'antd';

const LoginForm = ({ history }) => {

    let db = MockDB();
    let username = document.getElementById('username');
    let password = document.getElementById('password');

    let login = () => {
        auth.login(() => {
            let data = db.users.data;
            let message = 'Invalid credentials';

            if (username.value in data) {
                if (data[username.value]['address']['street'] === password.value) {
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
