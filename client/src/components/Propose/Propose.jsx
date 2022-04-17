import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Col, Select, Typography, Row, Divider} from 'antd';
import axios from "axios";
import {ENV} from "../env";
import {useNavigate} from "react-router-dom";

const {Text, Title} = Typography

const Propose = () => {

    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');
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

    const onGenderChange = (value) => {
        switch (value) {
            case '1':
                setCategory('1')
                return;
            case '2':
                setCategory('2')
                return;
            case '3':
                setCategory('3')
                return;
            case '4':
                setCategory('4')
                return;
            case '5':
                setCategory('5')
                return;
        }
    };



    const setValues = () => {
        axios.post(ENV +'/api/post/item',
            {author: userName, image: image,  title: title, text: text, category: category, userId: userId}, {withCredentials: true}).then(
        )
    }




    return (
        <>
            <h3 style={{color: "red"}}>Заповніть всі поля *</h3>
        <Row gutter={[24,24]}>
            <Col xs={24} sm={24} lg={14} >
                <Form form={form} >
                    <Form.Item name={['user', 'name']} label="Ім'я автора">
                        <Input style={{height:"40px"}} prefix={userName} disabled />
                    </Form.Item>
                    <Form.Item name={['user', 'img']} label="URL картинки" rules={[{ required: true }]}>
                        <Input style={{height:"40px"}} onChange={(e)=>setImage(e.target.value)}/>
                    </Form.Item>
                    <Form.Item name={['user', 'title']} label="Заголовок" rules={[{ required: true }]}>
                        <Input style={{height:"40px"}} onChange={(e)=>setTitle(e.target.value)}/>
                    </Form.Item>
                    <Form.Item name={['user', 'news']} label="Текст" rules={[{ required: true }]}>
                        <Input.TextArea style={{height:"250px"}} onChange={(e)=>setText(e.target.value)}/>
                    </Form.Item>
                    <Form.Item name="category" label="Категорія" rules={[{ required: true }]}>
                        <Select
                            placeholder="Виберіть категорію"
                            allowClear
                            onChange={onGenderChange}
                            style={{height:"40px"}}
                        >
                            <Select.Option value={'1'}>Політика</Select.Option>
                            <Select.Option value={'2'}>Суспільство</Select.Option>
                            <Select.Option value={'3'}>Covid</Select.Option>
                            <Select.Option value={'4'}>Спорт</Select.Option>
                            <Select.Option value={'5'}>Шоу-бізнес</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="dashed" onClick={()=> {
                            setValues()
                            form.resetFields();
                        }
                        } >
                            Надіслати
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col xs={24} sm={24} lg={10}>
                <h1>Запропонувати новину</h1>
                <Divider/>
                <h2>Маєте цікаву новину та бажаєте нею поділитись?</h2>
                <h3>Надішліть її нам, наші редактори опублікують її якщо вона підходить за форматом</h3>
            </Col>
        </Row>
        </>
    );
};

export default Propose;
