import React, {useEffect, useState} from 'react';
import {Form, Input, Select, Checkbox, Button, Row, Col} from 'antd';
import axios from "axios";
import {ENV} from "../env";
const { Option } = Select;

const Registration = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);


    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const setValues = () => {
        axios.post(ENV + '/registration',
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
                               rules={[{type: 'email', message: 'Некоректні дані',}, {
                                   required: true,
                                   message: 'Введіть email!',
                               },]}>
                        <Input onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Item>

                    <Form.Item name="password" label="Пароль"
                               rules={[{required: true, message: 'Введіть пароль!',}]}
                               hasFeedback
                    >
                        <Input.Password onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>

                    <Form.Item name="confirm" label="Підтвердіть пароль" dependencies={['password']} hasFeedback
                               rules={[{required: true, message: 'Підтвердіть email!',},
                                   ({getFieldValue}) => ({
                                       validator(_, value) {
                                           if (!value || getFieldValue('password') === value) {
                                               return Promise.resolve();
                                           }

                                           return Promise.reject(new Error('Паролі не співпадають!'));
                                       },
                                   }),
                               ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item name="nickname" label="Ім'я" tooltip="What do you want others to call you?" rules={[
                        {
                            required: true,
                            message: "Введіть ім'я користувача",
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
                            Зареєструватися
                        </Button>
                    </Form.Item>
                </Form>
                </Col>
            </Row>
        </>
    );
};


export default Registration;
