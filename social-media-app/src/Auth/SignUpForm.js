import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import auth from './utils/auth';
import { addNewUser } from '../DB/utils/store-utils';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignUpForm = ({ history }) => {

    const [form] = Form.useForm();

    const onFinish = (values) => {

        //TODO: store new user info on server

        auth.login(() => {
            addNewUser(values.username, '');
        })
        history.push('/main');
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
            <h1 className="signup-header">Sign Up</h1>
            
            <Form {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                >

                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                    {
                        type: 'string',
                        pattern: /^([a-z]|[A-Z])+([a-z]|[A-Z]|\d)*$/,
                        message: 'Username may only contain letters and\n numbers and may only begin with a letter!',
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
                    name="name"
                    label="Name"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
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
                    name="phone"
                    label="Phone"
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
                    name="dateOfBirth"
                    label="Date of Birth"
                    rules={[
                    {
                        required: true,
                        message: 'This field is required',
                    },
                    () => ({
                        validator(_, value) {
                          if (isUnderage(value)) {
                            return Promise.reject(new Error('Only users who are 18 or older may'));
                        }
                          return Promise.resolve();
                        },
                      })
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="zipcode"
                    label="Zipcode"
                    rules={[
                    {
                        type: 'string',
                        pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
                        message: 'Zipcode does not match pattern: 77005',
                    },
                    {
                        required: true,
                        message: 'Please input your phone Zipcode',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
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

                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>

            </Form>

        </>
    )

    function isUnderage(value) {

        // calculate age of user
        let today = new Date();
        let age = value.toDate();
        let year = age.getFullYear();
        let month = age.getMonth();
        let day = age.getDate() + 1;  // ** browser kept showing the day as 1 less than supposed to ** //

        // checks if user's age is 18 years or younger
        if (today.getFullYear() - year < 18){
            return true;
            //errorElement.innerText = "Only individuals who are 18 years of age or older are allowed to register";
        }

        // check for month difference
        else if (today.getMonth() - month < 0) {
            return true;
            //errorElement.innerText = "Only individuals who are 18 years of age or older are allowed to register";
        }

        // check for day difference
        else if (today.getDate() - day < 0) {
            return true;
            //errorElement.innerText = "Only individuals who are 18 years of age or older are allowed to register";
        }

        else {
            return false;
        }
    }
}

export default SignUpForm
