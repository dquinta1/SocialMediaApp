import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../Auth-Context/AuthContext';
import { Form, Input, Button, DatePicker, Space, message } from 'antd';

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignUpForm = ({ history }) => {
	const [form] = Form.useForm();

	const { auth, signUpWithUsernameAndPassword } = useContext(AuthContext);

	// if user is already authorized then redirect to main page
	useEffect(() => {
		if (auth.token) {
			history.push('/main');
		}
	}, []);

	const onFinish = async (values) => {
		// create new user object
		const newUser = {
			username: values.username,
			name: values.name,
			id: -1,
			email: values.email,
			phone: values.phone,
			dateOfBirth: new Date(values.dateOfBirth).toLocaleDateString('en-US'),
			zipcode: values.zipcode,
			password: values.password,
			confirm: values.confirm,
		};

		// attempt to register new user
		let token = await signUpWithUsernameAndPassword(newUser);

		// check that user was successfully registered
		if (token) {
			let redirect = () => {
				history.push('/main');
			};
			setTimeout(redirect, 3500);
			message
				.loading('Validating Credentials', 2)
				.then(() => message.success('Registered Successfully!', 2));
		} else {
			message.error('A user with these credentials already exists', 5);
		}
	};

	const formItemLayout = {
		labelCol: {
			xs: {
				span: 14,
			},
			sm: {
				span: 8,
			},
		},
		wrapperCol: {
			xs: {
				span: 14,
			},
			sm: {
				span: 8,
			},
		},
	};

	return (
		<>
			<Space
				style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}
			>
				<Button type='link' style={{ flex: 'start' }} href='/'>
					Back to Log In
				</Button>
				{/* <h1 className='signup-header' style={{ flex: '1 auto' }}>
					Sign Up
				</h1> */}
			</Space>

			<Form
				{...formItemLayout}
				form={form}
				name='register'
				onFinish={onFinish}
				scrollToFirstError
			>
				<Form.Item
					name='username'
					label='Username'
					rules={[
						{
							type: 'string',
							pattern: /^([a-z]|[A-Z])+([a-z]|[A-Z]|\d)*$/,
							message:
								'Username may only contain letters and\n numbers and may only begin with a letter!',
						},
						{
							required: true,
							message: 'This field is required',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item name='name' label='Name'>
					<Input />
				</Form.Item>

				<Form.Item
					name='email'
					label='E-mail'
					rules={[
						{
							type: 'email',
							message: 'Thist is not a valid E-mail!',
						},
						{
							required: true,
							message: 'Please input your E-mail!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name='phone'
					label='Phone'
					rules={[
						{
							type: 'string',
							pattern: phoneRegExp,
							message: 'Phone number does not match pattern: 123-456-7890',
						},
						{
							required: true,
							message: 'Please input your phone number',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name='dateOfBirth'
					label='Date of Birth'
					rules={[
						{
							required: true,
							message: 'This field is required',
						},
						() => ({
							validator(_, value) {
								if (isUnderage(value)) {
									return Promise.reject(
										new Error('Only users who are 18 or older may')
									);
								}
								return Promise.resolve();
							},
						}),
					]}
				>
					<DatePicker />
				</Form.Item>

				<Form.Item
					name='zipcode'
					label='Zipcode'
					rules={[
						{
							type: 'string',
							pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
							message: 'Zipcode does not match pattern: 77005',
						},
						{
							required: true,
							message: 'Please input your zipcode',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name='password'
					label='Password'
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
						{
							min: 3,
							message: 'Password must be at least 3 characters',
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name='confirm'
					label='Confirm Password'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}

								return Promise.reject(
									new Error('The two passwords that you entered do not match!')
								);
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item style={{ textAlign: 'center' }}>
					<Button type='primary' htmlType='submit'>
						Register
					</Button>
				</Form.Item>
			</Form>
		</>
	);

	function isUnderage(value) {
		// calculate age of user
		let today = new Date();
		let age = value.toDate();
		let year = age.getFullYear();
		let month = age.getMonth();
		let day = age.getDate() + 1; // ** browser kept showing the day as 1 less than supposed to ** //

		// checks if user's age is 18 years or younger
		if (today.getFullYear() - year < 18) {
			return true;
		}

		// same year
		else if (today.getFullYear() - year === 18) {
			// check for month difference
			if (today.getMonth() - month < 0) {
				return true;
			}

			// same month
			else if (today.getMonth() - month === 0) {
				// check for day difference
				if (today.getDate() - day < 0) {
					return true;
				}
			}
		}
		return false;
	}
};

export default SignUpForm;
