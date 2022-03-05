import React, {useState} from 'react';
import {useGetCryptoNewsQuery} from "../../services/newsApi";
import {Avatar, Card, Col, Row, Typography, Select} from "antd";
import moment from "moment";
import './LastNews.css'
import axios from "axios";
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const {Text, Title} = Typography
const {Option} = Select

const LastNews = ({name}) => {



    return (
        <div style={{marginLeft: "25px"}}>
            {
                name.map((news)=>(
                    <Col xs={24} sm={12} lg={24} key={news.id}>
                        <div style={{height: "150px", display: "flex"}}>
                                <a href={news.url} target={"_blank"} rel={"noreferrer"}>
                                    <div>
                                        <img style={{width: '170px', height: '100px'}} src={news.image} alt={"news"}/>
                                    </div>
                                </a>
                            <Title style={{marginLeft: "5px"}} level={5}>{news.name}</Title>
                        </div>
                    </Col>
                ))
            }
        </div>
    );
};

export default LastNews;
