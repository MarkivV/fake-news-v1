import React, {useState} from 'react';
import {Form, Input, Button, Col, Select, Typography, Row, Checkbox} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const setValues = () => {
        axios.post('http://localhost:3001/login',
            {username: username, password: password}, {withCredentials: true})
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"  onChange={(e)=>setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={()=>{
                    setValues()
                }}>
                    Log in
                </Button>
                Or <a href="/registration">register now!</a>
            </Form.Item>
        </Form>
    );
};

export default Login;
