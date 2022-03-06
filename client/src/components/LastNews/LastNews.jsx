import React, {useState} from 'react';
import {useGetCryptoNewsQuery} from "../../services/newsApi";
import {Avatar, Card, Col, Row, Typography, Select} from "antd";
import moment from "moment";
import './LastNews.css'
import axios from "axios";
import {Link} from "react-router-dom";
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const {Text, Title} = Typography
const {Option} = Select

const LastNews = ({name}) => {


    return (
        <Row style={{marginLeft: "25px"}}>
            {
                name.map((news)=>(
                    <Col xs={24} sm={12} lg={24} key={news.id}>
                        <a href={`/${news.id}`}>
                            <Text mark style={{marginLeft: "5px"}} level={4}>{news.category}</Text>
                            <div style={{height: "150px", display: "flex"}}>
                                    <a href={news.url} target={"_blank"} rel={"noreferrer"}>
                                        <div>
                                            <img style={{width: '170px', height: '100px'}} src={news.image} alt={"news"}/>
                                        </div>
                                    </a>
                                <h3 style={{marginLeft: "5px", fontSize: "20px" }}>{news.name}</h3>
                            </div>
                        </a>
                    </Col>
                ))
            }
        </Row>
    );
};

export default LastNews;
