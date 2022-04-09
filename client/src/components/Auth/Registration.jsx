import React, { useState } from 'react';
import {Form, Input, Select, Checkbox, Button, Row, Col} from 'antd';
import axios from "axios";
const { Option } = Select;

const Registration = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const setValues = () => {
        axios.post('http://localhost:3001/registration',
            {email: email, username: username, password: password}, {withCredentials: true})
    }


    return (
        <>
            <Row gutter={[24,24]}>
                <Col xs={24} sm={24} lg={12}>
                <Form form={form} name="register" onFinish={onFinish}
                      initialValues={{residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86'}}
                      scrollToFirstError
                >
                    <Form.Item name="email" label="E-mail"
                               rules={[{type: 'email', message: 'The input is not valid E-mail!',}, {
                                   required: true,
                                   message: 'Please input your E-mail!',
                               },]}>
                        <Input onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Item>

                    <Form.Item name="password" label="Password"
                               rules={[{required: true, message: 'Please input your password!',}]}
                               hasFeedback
                    >
                        <Input.Password onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>

                    <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback
                               rules={[{required: true, message: 'Please confirm your password!',},
                                   ({getFieldValue}) => ({
                                       validator(_, value) {
                                           if (!value || getFieldValue('password') === value) {
                                               return Promise.resolve();
                                           }

                                           return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                       },
                                   }),
                               ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item name="nickname" label="Nickname" tooltip="What do you want others to call you?" rules={[
                        {
                            required: true,
                            message: 'Please input your nickname!',
                            whitespace: true,
                        },
                    ]}
                    >
                        <Input onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={() => {
                            setValues()
                            form.resetFields();
                        }}>
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
                </Col>
            </Row>
        </>
    );
};


export default Registration;
