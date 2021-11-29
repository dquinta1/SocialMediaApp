import React from 'react';
import { Form, Input, Button, DatePicker, Space } from 'antd';
import useRegister from '../../Auth/useRegister';
import { useNavigate } from 'react-router-dom';

// const phoneRegExp =
// 	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignUpForm = () => {
	const navigate = useNavigate();
	const { form, onFinish } = useRegister();

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
				<Button
					type='link'
					style={{ flex: 'start' }}
					onClick={() => navigate('/login')}
				>
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
				onSubmit={(e) => e.preventDefault()}
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

				<Form.Item
					name='headline'
					label='Headline'
					rules={[
						{
							type: 'string',
							max: 20,
							message: 'Headline must not exceed 20 characters',
						},
						{
							required: true,
							message: 'Please input your headline',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name='email'
					label='E-mail'
					rules={[
						{
							type: 'email',
							message: 'Thist is not a valid e-mail!',
						},
						{
							required: true,
							message: 'Please input your e-mail!',
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
