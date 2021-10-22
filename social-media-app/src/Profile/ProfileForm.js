import React, { useState } from 'react'
import { Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ProfileForm = () => {

    const [form] = Form.useForm();

    const [name, setName] = useState('Jane Doe');
    const [email, setEmail] = useState('some@email.com');
    const [phone, setPhone] = useState('123-456-7896');
    const [zipcode, setZipcode] = useState('77005');
    const [password, setPassword] = useState('1234');
    const [confirm, setConfirm] = useState('1234');

    const onFinish = (values) => {
        setName(values.name);
        setEmail(values.email);
        setPhone(values.phone);
        setZipcode(values.zipcode);
        setPassword(values.password);
        setConfirm(values.confirm);
    }

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
            <Form 
                form={form}
                name="editProfile"
                onFinish={onFinish}
                scrollToFirstError
                >
                <Form.Item
                    initialValue='someRandomUsername8'
                    name="username"
                    label="Username"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="name"
                    label={"Name: " + name}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label={"E-mail: " + email}
                    rules={[
                    {
                        type: 'email',
                        message: 'Thist is not a valid E-mail!',
                    }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label={"Phone: " + phone}
                    rules={[
                    {
                        type: 'string',
                        pattern: phoneRegExp,
                        message: 'Phone number does not match pattern: 123-456-7890',
                    }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="dateOfBirth"
                    label="Date of Birth"
                    initialValue={moment().subtract(18, 'years').calendar().toString()}
                >
                    {/* <DatePicker disabled defaultValue={moment().subtract(18, 'years').calendar()} /> */}
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    name="zipcode"
                    label={"Zipcode: " + zipcode}
                    rules={[
                    {
                        type: 'string',
                        pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
                        message: 'Zipcode does not match pattern: 77005',
                    }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    initialValue={ password }
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    initialValue={confirm}
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }

                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Confirm
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ProfileForm
