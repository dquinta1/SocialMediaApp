import React from 'react';
import auth from './utils/auth';
import MockDB from './utils/MockDB';
import { Button } from 'antd';

const LoginForm = ({ history }) => {

    let db = MockDB();
    let username = document.getElementById('username');
    let password = document.getElementById('password');

    let login = () => {
        auth.login(() => {
            let data = db.data;
            let message = 'Invalid credentials';

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                
                if (element.username === username.value && 
                    element.address.street == password.value) {
                        history.push('/main');
                        message = '';
                        break;
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
