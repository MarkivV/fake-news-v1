import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import axios from "axios";
import {ENV} from "../env";
import {useNavigate} from "react-router-dom";

const ProposeLive = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
        let accessToken = JSON.parse(localStorage.getItem("access-token"))
        if(!accessToken){
            navigate('/login')
        }
        let username = JSON.parse(localStorage.getItem("username"))
        let userId = JSON.parse(localStorage.getItem("userId"))
        if(username){
            setUserName(username)
            setUserId(userId)
        }
    }, []);

    const setValues = () => {
        axios.post(ENV + '/api/post/live',
            {author: userName,  title: title, text: text, userId: userId}, {withCredentials: true}).then(
        )
    }

    return (
        <>
            <h3 style={{color: "red"}}>Заполните все поля *</h3>
            <Row gutter={[24,24]}>
                <Col xs={24} sm={24} lg={12} >
                    <Form form={form} >
                        <Form.Item name={['user', 'name']} label="Имя автора">
                            <Input style={{height:"40px"}} prefix={userName} disabled/>
                        </Form.Item>
                        <Form.Item name={['user', 'title']} label="Заголовок" rules={[{ required: true }]}>
                            <Input style={{height:"40px"}} onChange={(e)=>setTitle(e.target.value)}/>
                        </Form.Item>
                        <Form.Item name={['user', 'news']} label="Текст" rules={[{ required: true }]}>
                            <Input.TextArea style={{height:"250px"}} onChange={(e)=>setText(e.target.value)}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={()=> {
                                setValues()
                                form.resetFields();
                            }
                            } >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ProposeLive;
