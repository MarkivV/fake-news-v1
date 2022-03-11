import React from 'react';
import {Space, Typography} from "antd";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <div className="footer">
                <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                    Latters<br/>
                    All rights reserved
                </Typography.Title>
                <Space>
                    <Link to={"/"}>Связь</Link>
                    <Link to={"/politic"}>Главная</Link>
                    <Link to={"/society"}>Общество</Link>
                    <Link to={"/propose"}>Предложить</Link>
                </Space>
            </div>
        </div>
    );
};

export default Footer;
