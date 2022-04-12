import React, {useEffect, useState} from 'react';
import "./Navbar.css"
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

            <Col className={"menu-main"}>
                <li>
                    <Link to={"/"} ><h3>Главная</h3></Link>
                </li>
                <li>
                    <Link to={"/politic"} ><h3>Политика</h3></Link>
                </li >
                <li>
                    <Link to={"/society"} ><h3>Общество</h3></Link>
                </li>
                <li>
                    <Link to={"/covid"} ><h3>Ковид</h3></Link>
                </li>
                <li>
                    <Link to={"/sport"} ><h3>Спорт</h3></Link>
                </li>
                <li>
                    <Link to={"/media"} ><h3>Шоу-бизнес</h3></Link>
                </li>
                <li>
                    <Link to={"/live-news"} ><h3>LiveNews</h3></Link>
                </li>
                <li>
                    <Link to={"/profile/" + JSON.parse(localStorage.getItem("userId"))} ><h3>Profile</h3></Link>
                </li>
            </Col>
        )}
        </>

    );
};

export default Navbar;
