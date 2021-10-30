import React, { useState, useContext, useEffect } from 'react';
import FeedContext from '../../Main/Context/feed-context';
import { Form, Input, Button } from 'antd';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ProfileForm = () => {

    const { user, editProfile } = useContext(FeedContext);

    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(true);

    // assign modified input values to edit profile and clear form
    const onFinish = () => {

        // create new user Profile based on input
        const newProfile = {
            name: form.getFieldValue('name') === '' ? user.name : form.getFieldValue('name'),
            email: form.getFieldValue('email') === '' ? user.email : form.getFieldValue('email'),
            phone: form.getFieldValue('phone') === '' ? user.phone : form.getFieldValue('phone'),
            zipcode: form.getFieldValue('zipcode') === '' ? user.zipcode : form.getFieldValue('zipcode'),
            password: form.getFieldValue('password') === '' ? user.password : form.getFieldValue('password'),
        };

        // assign values and change state
        editProfile(newProfile);

        // reset the form fields
        form.resetFields();
    };

    useEffect(() => {
        if (typeof(user) !== typeof(undefined)) {
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
            { (isLoading)
            ? <h1>Nothing here</h1>
            : <Form 
                form={form}
                name="editProfile"
                onFinish={onFinish}
                scrollToFirstError
                >
                <Form.Item
                    initialValue={ user.username }
                    name="username"
                    label="Username:"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="name"
                    label={"Name:"}
                    
                >
                    <Input placeholder={ user.name }  />
                </Form.Item>
                <Form.Item
                    name="email"
                    label={"E-mail:"}
                    rules={[
                    {
                        type: 'email',
                        message: 'Thist is not a valid E-mail!',
                    }
                    ]}
                >
                    <Input placeholder={ user.email }  />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label={"Phone:"}
                    rules={[
                    {
                        type: 'string',
                        pattern: phoneRegExp,
                        message: 'Phone number does not match pattern: 123-456-7890',
                    }
                    ]}
                >
                    <Input placeholder={ user.phone }  />
                </Form.Item>
                <Form.Item 
                    name="dateOfBirth"
                    label="Date of Birth"
                    initialValue={ user.dateOfBirth }
                >
                    {/* <DatePicker disabled defaultValue={moment().subtract(18, 'years').calendar()} /> */}
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    name="zipcode"
                    label={"Zipcode:"}
                    rules={[
                    {
                        type: 'string',
                        pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
                        message: 'Zipcode does not match pattern: 77005',
                    }
                    ]}
                >
                    <Input placeholder={ user.zipcode } />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            min: 3,
                            message: 'Password must be at least 3 characters',
                        }
                        ]}
                    hasFeedback
                >
                    <Input.Password minLength={ 3 } />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
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
            }
        </>
    )
}

export default ProfileForm;
