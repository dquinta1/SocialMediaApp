import React from 'react';
import auth from './utils/auth';
import MockDB from '../DB/MockDB';
import { Layout, Space } from 'antd';
import { loadFollowers, loadPosts, loadUser } from '../DB/utils/store-utils';
import { useState as useHookState } from '@hookstate/core';
import store from '../DB/store';
import LoginForm from './LoginForm';

const { Header, Content } = Layout;

const Login = ({ history }) => {
    const { posts } = useHookState(store); 
    const db = MockDB();

    let username = document.getElementById('username');
    let password = document.getElementById('password');

    let login = () => {
        auth.login(() => {
            let data = db.users.data;
            let id_data = db.iDs.data;
            let postsData = db.posts.data;
            let message = 'Invalid credentials';

            if (username.value in data) {
                if (data[username.value]['address']['street'] === password.value) {

                    loadUser(username.value, data);
                    loadFollowers(data[username.value]['id'], id_data);

                    var store = require('store');
                    let user = store.get('user');
                    let followers = store.get('followers');

                    let ids = [user['id']];
                    for (let index = 0; index < followers.length; index++) {
                        const element = followers[index];
                        ids.push(element['id'])
                    }
                    loadPosts(ids, posts, postsData, id_data);

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
        <Layout theme='light' className="login-layout" style={{ paddingTop:'50px', margin: 'auto', width: '400px', height: '500px'}}>

            <Header className="login-layout-background">
                <Space>
                    <h1>Login</h1>
                </Space>
            </Header>

            <Content style={{ margin: 'auto', overflow: 'initial', paddingTop:'30%'}}>

                {LoginForm(login,signUp)}
                
            </Content>
            
        </Layout>        
    )
}

export default Login
