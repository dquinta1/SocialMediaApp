import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Space } from 'antd';

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ProfileForm = () => {
	const [form] = Form.useForm();
	const [isLoading, setLoading] = useState(true);

	// local state (delete at integration)
	const [localProfile, setlocalProfile] = useState({
		name: user.name,
		email: user.email,
		phone: user.phone,
		zipcode: user.zipcode,
		password: user.password,
	});

	// assign modified input values to edit profile and clear form
	const onFinish = () => {
		// create new user Profile based on input
		const newProfile = {
			name:
				form.getFieldValue('name') === '' ||
				typeof form.getFieldValue('name') === typeof undefined
					? user.name
					: form.getFieldValue('name'),
			email:
				form.getFieldValue('email') === '' ||
				typeof form.getFieldValue('email') === typeof undefined
					? user.email
					: form.getFieldValue('email'),
			phone:
				form.getFieldValue('phone') === '' ||
				typeof form.getFieldValue('phone') === typeof undefined
					? user.phone
					: form.getFieldValue('phone'),
			zipcode:
				form.getFieldValue('zipcode') === '' ||
				typeof form.getFieldValue('zipcode') === typeof undefined
					? user.zipcode
					: form.getFieldValue('zipcode'),
			password:
				form.getFieldValue('password') === '' ||
				typeof form.getFieldValue('password') === typeof undefined
					? user.password
					: form.getFieldValue('password'),
		};

		// set local values (remove at integration)
		setlocalProfile(newProfile);

		// assign values and change state
		editProfile(newProfile);

		// reset the form fields
		form.resetFields();
	};

	useEffect(() => {
		if (typeof user !== typeof undefined) {
			setLoading(false);
		}
	}, [user]);

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
			{isLoading ? (
				<h1>Nothing here</h1>
			) : (
				<Form
					form={form}
					name='editProfile'
					onFinish={onFinish}
					scrollToFirstError
				>
					<Form.Item
						initialValue={user.username}
						name='username'
						label='Username:'
					>
						<Input disabled />
					</Form.Item>

					<Form.Item name='name' label={'Name:'}>
						<Space align='baseline'>
							<Input placeholder={user.name} />
							{/* delete at integration */}
							<p>{localProfile.name}</p>
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
							<Input placeholder={user.email} />
							{/* delete at integration */}
							<p>{localProfile.email}</p>
						</Space>
					</Form.Item>

					<Form.Item
						name='phone'
						label={'Phone:'}
						rules={[
							{
								type: 'string',
								pattern: phoneRegExp,
								message: 'Phone number does not match pattern: 123-456-7890',
							},
						]}
					>
						<Space align='baseline'>
							<Input placeholder={user.phone} />
							{/* delete at integration */}
							<p>{localProfile.phone}</p>
						</Space>
					</Form.Item>

					<Form.Item
						name='dateOfBirth'
						label='Date of Birth'
						initialValue={user.dateOfBirth}
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
							<Input placeholder={user.zipcode} />
							{/* delete at integration */}
							<p>{localProfile.zipcode}</p>
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
			)}
		</>
	);
};

export default ProfileForm;
