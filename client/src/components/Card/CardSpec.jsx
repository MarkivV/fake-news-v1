import React, {useState} from 'react';
import {Card, Col, Row, Typography, Select} from "antd";
import moment from "moment";
import './card.css'
import {Link} from "react-router-dom";
const {Text, Title} = Typography
const {Option} = Select

const CardSpec = ({name}) => {



    return (

        <Row gutter={[24,24]}>
            {
                name.map((news)=>(
                    <Col xs={24} sm={12} lg={8} key={news.id}>
                        <Link to={`${news.id}`}>
                        <div>
                        {/*<Card hoverable className={"news-card"} style={{height: "550px"}}>*/}
                            <a href={news.url} target={"_blank"} rel={"noreferrer"}>
                                <div className="news-image-container">
                                    <img style={{width: '400px'}} src={news.image} alt={"news"}/>
                                </div>
                                <div style={{marginLeft: "40px"}}>
                                    <Title level={8}>{news.name}</Title>
                                </div>
                                <div style={{marginLeft: "40px", marginTop: "10px"}} className="provider-container">
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </div>
                        {/*</Card>*/}
                        </Link>
                    </Col>
                ))
            }
        </Row>
    );
};

export default CardSpec;
