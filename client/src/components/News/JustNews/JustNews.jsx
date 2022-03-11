import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Avatar, Card, Col, Row} from "antd";
import moment from "moment";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import styles from './JustNews.css'
import CardM from "../../Card/Card";
import CardSpec from "../../Card/CardSpec";
import Footer from "../../Footer/Footer";
const JustNews = () => {
    const [name, setName] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/api/get', {
            params: {
                id: 1
            }
        })
            .then((response)=>{
                setName(response.data)
            })
    }, [])

    if(!name){
        return 'loading'
    }

    return (
        <>
            <CardSpec name={name}/>
        </>
    );
};

export default JustNews;
