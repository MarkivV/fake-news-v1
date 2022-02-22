import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Avatar, Card, Col, Row} from "antd";
import moment from "moment";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import styles from './JustNews.css'
import CardM from "../../Card/Card";
const JustNews = () => {
    const [name, setName] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:3001/api/get')
            .then((response)=>{
                setName(response.data)
            })
    }, [])

    // const translateText = (inputText) => {
    //
    //     let data = {
    //         q : inputText,
    //         source: 'ru',
    //         target: 'en'
    //     }
    //     axios.post(`https://libretranslate.de/translate`, data)
    //         .then((response) => {
    //             return(response.data.translatedText)
    //         })
    // }

    return (
        <>
            <CardM name={name}/>
        </>
    );
};

export default JustNews;
