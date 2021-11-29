import React from 'react';
import { Form, Space, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useLogin from '../../Auth/useLogin';

const LoginForm = ({ history }) => {
	const {
		username,
		password,
		setUsername,
		setPassword,
		clickToLogin,
		goToSignUp,
	} = useLogin(history);

	return (
		<>
			<Form
				name='normal_login'
				className='login-form'
				style={{ width: '300px' }}
				onSubmit={(e) => e.preventDefault()}
			>
				<Form.Item
					name='username'
					rules={[
						{
							required: true,
							message: 'Please input your Username!',
						},
					]}
				>
					<Input
						id='username'
						prefix={<UserOutlined className='site-form-item-icon' />}
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						placeholder='Username'
					/>
				</Form.Item>

				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: 'Please input your Password!',
						},
					]}
				>
					<Input
						id='password'
						prefix={<LockOutlined className='site-form-item-icon' />}
						type='password'
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						placeholder='Password'
					/>
				</Form.Item>

				<Form.Item>
					<Space>
						<Button type='primary' onClick={clickToLogin} htmlType='submit'>
							Log in
						</Button>
						<Button type='default' className='signup-btn' onClick={goToSignUp}>
							Sign Up
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	);
};

export default LoginForm;
