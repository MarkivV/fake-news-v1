import React, {useEffect, useState} from 'react';
import CardM from "../../Card/Card";
import axios from "axios";
import Slider from "../../slider/Slider";
import {Col, Row} from "antd";
import LastNews from "../../LastNews/LastNews";
const NewsTop = () => {

    const [name, setName] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:3001/api/get')
            .then((response)=>{
                setName(response.data)
            })
    }, [])



    return(
        <Row>
        <Col span={16}>
            <Slider/>
            <CardM name={name}/>
        </Col>
        <Col span={8}>
            <LastNews name={name}/>
        </Col>

        </Row>
    )
};

export default NewsTop;
