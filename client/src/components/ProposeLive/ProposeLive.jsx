import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Row, Select} from "antd";
import axios from "axios";
import {ENV} from "../env";
import {useNavigate} from "react-router-dom";

const ProposeLive = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        let accessToken = JSON.parse(localStorage.getItem("access-token"))
        if(!accessToken){
            navigate('/login')
        }
        let username = JSON.parse(localStorage.getItem("username"))
        if(username){
            setUserName(username)
        }
    }, []);

    const setValues = () => {
        axios.post(ENV + '/api/post/live',
            {author: author,  title: title, text: text}, {withCredentials: true}).then(
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
