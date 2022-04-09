import React from 'react';
import {Col, Row} from "antd";

const LastLive = ({live}) => {
    return (
        <Row>
            {
                live.slice(0,7).map((news)=>(
                    <Col xs={24} sm={12} lg={24} key={news.id}>
                            <div>
                                <h3 style={{fontSize: "20px" }}>{news.name}</h3>
                                <p>{news.text}</p>
                            </div>
                        <hr/>
                    </Col>
                ))
            }
        </Row>
    );
};

export default LastLive;
