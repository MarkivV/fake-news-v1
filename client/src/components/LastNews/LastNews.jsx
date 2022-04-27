import React, {useState} from 'react';
import { Col, Row, Typography, Select} from "antd";
import './LastNews.css'

const {Text, Title} = Typography

const LastNews = ({name, step}) => {


    return (
        <Row>
            {
                name.slice(0,7).map((news)=>(
                    <Col xs={24} sm={24} lg={24} key={news.id}>
                        <a href={`/${news.id}`}>
                            <Text mark level={4}>{news.category}</Text>
                            <div style={{height: "110px", display: "flex"}}>
                                    <a href={news.url} target={"_blank"} rel={"noreferrer"}>
                                        <div>
                                            <img style={{width: '170px', height: '100px', objectFit: "cover"}} src={news.image} alt={"news"}/>
                                        </div>
                                    </a>
                                <h3 style={{marginLeft: "5px", fontSize: "15px" }} className={"mainCard"}>{news.name}</h3>
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
