import React, { useContext, useEffect, useState } from 'react';
import { Layout, Space } from 'antd';
import LoginForm from './LoginForm';
import AuthContext from '../Auth-Context/AuthContext';

const { Header, Content } = Layout;

const Login = ({ history }) => {

    const { auth, signInWithUsernameAndPassword } = useContext(AuthContext);

    // initialize invalid credential message
    const [message, setMessage] = useState('');

    // if user is already authorized then redirect to main page
    useEffect(() => {
        if(auth.token) {
            history.push('/main');
        };
    }, []);

    let login = async (username, password) => {

        // only perfom login logic if there is input
        if( username !== '' && password !== '' ) {
            // attempt to sign in with given credentials
            let token = await signInWithUsernameAndPassword(username, password);

            console.log('outside signIn logic, state: ', token);

            // check that user is authorized
            if(token) {
                setMessage('');
                history.push('/main');
            } else {
                setMessage('Invalid Credentials');
            }
        }
    };

    return (
        <Layout theme='light' className="login-layout" style={{ paddingTop:'50px', margin: 'auto', width: '400px', height: '500px'}}>

            <Header className="login-layout-background">
                <Space>
                    <h1>Login</h1>
                </Space>
            </Header>

            <Content style={{ margin: 'auto', overflow: 'initial', paddingTop:'30%'}}>

                <LoginForm  
                    login={ login }
                    history={ history }
                />
                
                <div id='auth-error-message' className="auth-error-message">{ message }</div>
                
            </Content>
            
        </Layout>        
    )
}

export default Login
