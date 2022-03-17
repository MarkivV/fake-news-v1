import React, {useState} from 'react';
import {Form, Input, Button, Col, Select, Typography, Row} from 'antd';
import axios from "axios";

const {Text, Title} = Typography

const Propose = () => {

    const [form] = Form.useForm();
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');

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
        axios.post('http://localhost:3001/api/post/item',
            {author: author, image: image, title: title, text: text, category: category}, {withCredentials: true}).then(

        )
    }


    return (
        <>
            <h3 style={{color: "red"}}>Заполните все поля *</h3>
        <Row gutter={[24,24]}>
            <Col xs={24} sm={24} lg={14} >
                <Form form={form} >
                    <Form.Item name={['user', 'name']} label="Имя автора" rules={[{ required: true }]}>
                        <Input style={{height:"40px"}} onChange={(e)=>setAuthor(e.target.value)}/>
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
                    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                        <Select
                            placeholder="Выберите категорию"
                            allowClear
                            onChange={onGenderChange}
                            style={{height:"40px"}}
                        >
                            <Select.Option value={'1'}>Политика</Select.Option>
                            <Select.Option value={'2'}>Общество</Select.Option>
                            <Select.Option value={'3'}>Ковид</Select.Option>
                            <Select.Option value={'4'}>Спорт</Select.Option>
                            <Select.Option value={'5'}>Шоу-бизнес</Select.Option>
                        </Select>
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
            <Col xs={24} sm={24} lg={10}>
                <h3 style={{color: "red"}}>
                    Правила приёма публикаций
                </h3>
                <h3>
                    1. Изображение прикрепленное к публикации должно быть строго в горизонтальном формате
                </h3>
                <h3>
                    2. Длина заголовка не должна привышать 80 символов
                </h3>
                <h3>
                    3. Изображение прикрепленное к публикации не должно содержать водяных знаков
                </h3>
                <h3>
                    4. Выбирайте только актуальную категорию
                </h3>
            </Col>
        </Row>
        </>
    );
};

export default Propose;
