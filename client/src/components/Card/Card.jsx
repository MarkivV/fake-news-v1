import React, {useState} from 'react';
import {useGetCryptoNewsQuery} from "../../services/newsApi";
import {Avatar, Card, Col, Row, Typography, Select} from "antd";
import moment from "moment";
import './card.css'
import axios from "axios";
import {Link} from "react-router-dom";
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const {Text, Title} = Typography
const {Option} = Select

const CardM = ({name}) => {



    return (

        <Row gutter={[24,24]}>
            {
                name.map((news)=>(

                    <Col xs={24} sm={12} lg={12} key={news.id}>
                        {/*<div className={"card"}>*/}
                        <Link to={`${news.id}`}>
                        <Card hoverable className={"news-card"} style={{height: "250px"}}>
                            <a href={news.url} target={"_blank"} rel={"noreferrer"}>
                                <div className="news-image-container">
                                    <Title className={"news-title"} level={4}>{news.name}</Title>
                                    <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news.image} alt={"news"}/>
                                </div>
                                <p>
                                    {
                                        news.description.length > 150 ? `${news.description.substring(0, 150)}...`
                                            :news.description
                                    }
                                </p>
                                <div className="provider-container">
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        {/*</div>*/}
                        </Card>
                        </Link>
                    </Col>
                ))
            }
        </Row>
    );
};

export default CardM;
