import React, {useState} from 'react';
import { Col, Row, Typography, Select} from "antd";
import './LastNews.css'

const {Text, Title} = Typography

const LastNews = ({name}) => {


    return (
        <Row>
            {
                name.slice(0,7).map((news)=>(
                    <Col xs={24} sm={12} lg={24} key={news.id}>
                        <a href={`/${news.id}`}>
                            <Text mark level={4}>{news.category}</Text>
                            <div style={{height: "150px", display: "flex"}}>
                                    <a href={news.url} target={"_blank"} rel={"noreferrer"}>
                                        <div>
                                            <img style={{width: '170px', height: '120px', objectFit: "cover"}} src={news.image} alt={"news"}/>
                                        </div>
                                    </a>
                                <h3 style={{marginLeft: "5px", fontSize: "20px" }} className={"mainCard"}>{news.name}</h3>
                            </div>
                        </a>
                        <hr/>
                    </Col>
                ))
            }
        </Row>
    );
};

export default LastNews;
