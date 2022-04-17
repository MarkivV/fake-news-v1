import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Col, Select, Typography, Row, Checkbox, Modal,message, Alert} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {ENV} from "../env";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [accessToken1, setAccessToken] = useState('');
    const [error, setError] = useState(false);
    const [imageUrl, setImageUrl] = useState(false);


    const [isModalVisible, setIsModalVisible] = useState(true);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);



    const setValues = () => {
        axios.post(ENV + '/login',
            {username: username, password: password},
            {withCredentials: true}).
        then((user)=>{
                setUser(user?.data.username)
                setUserId(user?.data.userId)
                setAccessToken(user?.data.accessToken)
                setImageUrl(user?.data.avatar)
                if(user.data === true){
                    setError(true)
                }else {
                    setError(false)
                }
        })

        if(user){
            window.localStorage.setItem("username", JSON.stringify(user))
            window.localStorage.setItem("userId", JSON.stringify(userId))
            window.localStorage.setItem("access-token", JSON.stringify(accessToken1))
            window.localStorage.setItem("imageUrl", JSON.stringify(imageUrl))
        }
    }

    return (
        <>
            <Row gutter={[24,24]}>
                <Col xs={24} sm={24} lg={12}>
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
                                message: "Будь-ласка задайте ім'я користувача",
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Ім'я користувача"  onChange={(e)=>setUsername(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Будь-ласка задайте пароль',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Пароль"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Item>
                    {
                        error
                            ?

                            <Alert
                                message="Виникла помилка"
                                description="Перевірте правильність введених Вами даних!"
                                type="error"
                            />

                            // {message.info('This is a normal message')}
                            // <Modal title="Произошла ошибка, проверьте равильность введённых данных" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            // </Modal>
                            :
                            <></>
                    }
                    <Form.Item style={{marginTop: "15px"}}>
                        <Button style={{marginRight: "10px"}} type="primary" htmlType="submit" className="login-form-button" onClick={()=>{
                            setValues()
                        }}>
                            Війти
                        </Button>

                        Немає акаунту?<a href="/registration" style={{margin: "10px"}}> Зареєструйтеся</a>
                    </Form.Item>
                </Form>
                </Col>
            </Row>
        </>
    );
};

export default Login;
