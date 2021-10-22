import React from 'react'
import { Form, Space, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = (login, signUp) => {

    return (
        <>
    
            <Form name="normal_login"
                className="login-form"
                style={{width:'300px'}}>

                <Form.Item 
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input id='username' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input id='password'
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type='primary' onClick={ login }>
                            Log in
                        </Button>
                        <Button type='default' className="signup-btn" onClick= { signUp }>
                            Sign Up
                        </Button>
                    </Space>
                </Form.Item>

            </Form>

            <div id='auth-error-message' className="auth-error-message"></div>
        </>
    )
}

export default LoginForm;
