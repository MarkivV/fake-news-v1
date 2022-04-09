import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Card, Col, Row} from "antd";
import moment from "moment";

const LiveNews = () => {
    const [liveNews, setLiveNews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/get/live',{withCredentials: true})
            .then((response)=>{
                setLiveNews(response.data)
            })
    }, []);


    return (
        <Row gutter={[24,24]}>
            {
                liveNews.map((live)=>(
                    <Col span={8}>
                        <Card>
                            <div style={{height: "200px"}}>
                                <h2>{live.name}</h2>
                                <p>{live.text}</p>
                                <div style={{marginTop: "10px"}} className="provider-container">
                                    <h5>Автор: {live.author}</h5>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    );
};

export default LiveNews;
