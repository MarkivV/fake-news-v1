import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Typography, Select} from "antd";
import moment from "moment";
import './card.css'
import axios from "axios";
import {Link} from "react-router-dom";

const {Text, Title} = Typography
const {Option} = Select

const CardM = ({category}) => {


    const [name, setName] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/api/get', {
            params: {
                id: category
            }
        })
            .then((response)=>{
                setName(response.data)
            })
    }, [])

    return (

        <Row gutter={[24,24]}>
            {
                name.slice(0,2).map((news)=>(

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
