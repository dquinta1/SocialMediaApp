import React from 'react';
import auth from './utils/auth';

const LoginForm = ({ history }) => {

    let login = () => {
        auth.login(() => {
            history.push('/main');
        });
    };

    let signUp = () => {
        history.push('/signup');
    }

    return (
        <div>
            <h1>Landing Page</h1>
            <button id='btn-login' className='login-btn' onClick= { login }>
                Log In
            </button>
            <button className= 'signup-btn' onClick= { signUp }>
                Sign Up
            </button>
        </div>
    )
}

export default LoginForm
