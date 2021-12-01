import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import useProfile from '../../../Hooks/Profile/useProfile';
import useLogic from './useLogic';

// const phoneRegExp =
// 	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ProfileForm = () => {
	const { form, onFinish } = useLogic();
	const { data, status, error } = useProfile();

	switch (status) {
		case 'loading':
			return <div>Loading...</div>;
		case 'error':
			return <div>{error.message}</div>;
		case 'success':
			return (
				<>
					<Form
						form={form}
						name='editProfile'
						onFinish={onFinish}
						scrollToFirstError
					>
						<Form.Item
							initialValue={data.username}
							name='username'
							label='Username:'
						>
							<Input disabled />
						</Form.Item>

						<Form.Item name='headline' label={'Headline:'}>
							<Space align='baseline'>
								<Input placeholder={data.headline} />
							</Space>
						</Form.Item>

						<Form.Item
							name='email'
							label={'E-mail:'}
							rules={[
								{
									type: 'email',
									message: 'Thist is not a valid E-mail!',
								},
							]}
						>
							<Space align='baseline'>
								<Input placeholder={data.email} />
							</Space>
						</Form.Item>

						<Form.Item
							name='dateOfBirth'
							label='Date of Birth'
							initialValue={data.dob}
						>
							{/* <DatePicker disabled defaultValue={moment().subtract(18, 'years').calendar()} /> */}
							<Input disabled />
						</Form.Item>

						<Form.Item
							name='zipcode'
							label={'Zipcode:'}
							rules={[
								{
									type: 'string',
									pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
									message: 'Zipcode does not match pattern: 77005',
								},
							]}
						>
							<Space align='baseline'>
								<Input placeholder={data.zipcode} />
							</Space>
						</Form.Item>
						<Form.Item
							name='password'
							label='Password'
							rules={[
								{
									min: 3,
									message: 'Password must be at least 3 characters',
								},
							]}
							hasFeedback
						>
							<Input.Password minLength={3} />
						</Form.Item>
						<Form.Item
							name='confirm'
							label='Confirm Password'
							dependencies={['password']}
							hasFeedback
							rules={[
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error(
												'The two passwords that you entered do not match!'
											)
										);
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item>
							<Button type='primary' htmlType='submit'>
								Confirm
							</Button>
						</Form.Item>
					</Form>
				</>
			);
		default:
			break;
	}
};

export default ProfileForm;
