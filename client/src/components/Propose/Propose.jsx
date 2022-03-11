import React, {useState} from 'react';
import {Form, Input, Button, Col, Select} from 'antd';
import {Option} from "antd/es/mentions";
import axios from "axios";


const Propose = () => {

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
            {author: author, image: image, title: title, text: text, category: category})
            .then(()=>{
                alert("successful")
            })
    }


    return (
        <Col span={8}>
            <Form >
                <Form.Item name={['user', 'name']} label="Имя автора" rules={[{ required: true }]}>
                    <Input  onChange={(e)=>setAuthor(e.target.value)}/>
                </Form.Item>
                <Form.Item name={['user', 'img']} label="URL картинки" rules={[{ required: true }]}>
                    <Input onChange={(e)=>setImage(e.target.value)}/>
                </Form.Item>
                <Form.Item name={['user', 'title']} label="Заголовок" rules={[{ required: true }]}>
                    <Input onChange={(e)=>setTitle(e.target.value)}/>
                </Form.Item>
                <Form.Item name={['user', 'news']} label="Текст" rules={[{ required: true }]}>
                    <Input.TextArea onChange={(e)=>setText(e.target.value)}/>
                </Form.Item>
                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Select
                        placeholder="Выберите категорию"
                        allowClear
                        onChange={onGenderChange}
                    >
                        <Select.Option value={'1'}>Политика</Select.Option>
                        <Select.Option value={'2'}>Общество</Select.Option>
                        <Select.Option value={'3'}>Ковид</Select.Option>
                        <Select.Option value={'4'}>Спорт</Select.Option>
                        <Select.Option value={'5'}>Шоу-бизнес</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={()=>setValues()}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    );
};

export default Propose;
