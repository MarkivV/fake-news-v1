import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Avatar, Card, Col, Row} from "antd";
import moment from "moment";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import styles from './JustNews.css'
import CardM from "../../Card/Card";
import CardSpec from "../../Card/CardSpec";
const JustNews = () => {
    const [name, setName] = useState([]);



    useEffect(()=>{
        axios.get('http://localhost:3001/api/get')
            .then((response)=>{
                setName(response.data)
            })
    }, [])

    return (
        <>
            <CardSpec name={name}/>
        </>
    );
};

export default JustNews;
