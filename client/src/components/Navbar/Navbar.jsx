import React, {useEffect, useState} from 'react';
import styles from "./Navbar.css"
import {Link} from "react-router-dom";
import {Button, Col, Row} from "antd";
import {MenuOutlined} from "@ant-design/icons";

const Navbar = () => {


    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);


    useEffect(() => {
        const handleResizeFunc = () =>{
            setScreenSize(window.innerWidth)
        }

        window.addEventListener('resize', handleResizeFunc)

        handleResizeFunc()
        return () => window.removeEventListener('resize', handleResizeFunc)

    }, []);


    useEffect(()=> {
        if(screenSize < 768){
            setActiveMenu(false)
        }else{
            setActiveMenu(true)
        }
    }, [screenSize])

    return (
        <>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Button className={"menu-control-container"} onClick={()=>setActiveMenu(!activeMenu)}>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <MenuOutlined/>
            </Button>
        {activeMenu && (
            <Row justify="end">
                <Col span={4} >
                    <Link to={"/"}><h3>Главная</h3></Link>
                </Col>
                <Col span={4} >
                    <Link to={"/politic"}><h3 style={{color: "red"}}>Политика</h3></Link>
                </Col >
                <Col span={4} >
                    <Link to={"/society"}><h3>Общество</h3></Link>
                </Col>
                <Col span={4} >
                    <Link to={"/covid"}><h3>Ковид</h3></Link>
                </Col>
                <Col span={4} >
                    <Link to={"/sport"}><h3>Спорт</h3></Link>
                </Col>
                <Col span={4} >
                    <Link to={"/media"}><h3>Шоу-бизнес</h3></Link>
                </Col>
            </Row>
        )}
        </>

    );
};

export default Navbar;
