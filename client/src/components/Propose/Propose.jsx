import React, {useState} from 'react';
import {Form, Input, InputNumber, Button, Col, Select} from 'antd';
import {Option} from "antd/es/mentions";

const Propose = () => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');

    const setValues = () => {
        setName(e.target.valueOf)
    }


    return (
        <Col span={8}>
            <Form >
                <Form.Item name={['user', 'name']} label="Имя автора" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'img']} label="URL картинки" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'title']} label="Заголовок" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'news']} label="Текст" rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Select
                        placeholder="Выберите категорию"
                        allowClear
                    >
                        <Option value={1}>Политика</Option>
                        <Option value={2}>Общество</Option>
                        <Option value={3}>Ковид</Option>
                        <Option value={4}>Спорт</Option>
                        <Option value={5}>Шоу-бизнес</Option>
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
