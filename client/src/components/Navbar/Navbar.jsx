import React, {useEffect, useState} from 'react';
import "./Navbar.css"
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Input, Row, Typography, Menu, Dropdown} from "antd";
import {MenuOutlined, PlusOutlined, UserOutlined, DownOutlined, CaretDownOutlined} from "@ant-design/icons";
import {ENV} from "../env";
const {Text, Title} = Typography

const Navbar = () => {


    const [activeMenu, setActiveMenu] = useState(false);
    const [screenSize, setScreenSize] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [username, setUsername] = useState('');
    let accessToken = JSON.parse(localStorage.getItem("access-token"))



    useEffect(() => {
        const handleResizeFunc = () =>{
            setScreenSize(window.innerWidth)
        }
        const imageUrlLS = JSON.parse(localStorage.getItem("imageUrl"))
        const usernameLS = JSON.parse(localStorage.getItem("username"))

        setImageUrl(imageUrlLS)
        setUsername(usernameLS)

        window.addEventListener('resize', handleResizeFunc)

        handleResizeFunc()
        return () => window.removeEventListener('resize', handleResizeFunc)

    }, [accessToken]);

    const menu = (
        <Menu>
            <Menu.Item>
                {
                    accessToken ? <a style={{cursor: "pointer"}} onClick={()=>
                    {
                        localStorage.clear()
                        window.location.reload(false)
                    }
                    }>Вихід</a> : <></>
                }
            </Menu.Item>
        </Menu>
    );


    return (
        <>
        {/*    /!* eslint-disable-next-line react/jsx-no-undef *!/*/}
        {/*    <Button className={"menu-control-container"} onClick={()=>setActiveMenu(!activeMenu)}>*/}
        {/*        /!* eslint-disable-next-line react/jsx-no-undef *!/*/}
        {/*        <MenuOutlined/>*/}
        {/*    </Button>*/}
        {/*{activeMenu && (*/}

            <Col className={"menu-main"}>
                <li className={"menu-lines"} onClick={()=>setActiveMenu(!activeMenu)}>
                    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="25" height="3" rx="1.5" fill="black"/>
                        <rect y="8" width="25" height="3" rx="1.5" fill="black"/>
                        <rect y="16" width="25" height="3" rx="1.5" fill="black"/>
                    </svg>
                </li>
                <Link to={"/"}>
                    <li style={{marginLeft: "55px"}} >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="10" width="10" height="10" fill="black"/>
                            <rect x="10" y="30" width="10" height="10" fill="black"/>
                            <rect width="10" height="10" fill="black"/>
                            <rect x="30" y="30" width="10" height="10" fill="#FFB1B1"/>
                            <rect x="30" y="20" width="10" height="10" fill="black"/>
                            <rect x="20" y="30" width="10" height="10" fill="black"/>
                            <rect x="10" y="20" width="10" height="10" fill="black"/>
                            <rect x="20" y="10" width="10" height="10" fill="black"/>
                            <rect x="10" width="10" height="10" fill="black"/>
                        </svg>
                    </li>
                </Link>

                <Input className={"inputClass"} placeholder="Пошук..." bordered={false}  />
                <Button className={"proposeDesc"} type="dashed" shape="round" style={{marginLeft: "15px", height: "35px"}}>
                    <Link to={"/propose"}><h3><PlusOutlined />Запропонувати</h3></Link>
                </Button>

                <div style={{display: "flex", marginLeft: "auto", alignItems: "center"}}>
                    <Link to={"/profile/" + JSON.parse(localStorage.getItem("userId"))}>
                        <Avatar shape="circle" size={64} src={ENV +`/images/${imageUrl}`} />
                    </Link>
                    <Dropdown  overlay={menu}>
                        <div style={{marginLeft: "10px", transform: "scale(1.2)"}} onClick={e => e.preventDefault()}>
                            <CaretDownOutlined />
                        </div>
                    </Dropdown>
                </div>
            </Col>
            <div className={activeMenu ? "menu-items active" : "menu-items"} >
                <Input className={"inputClass"} placeholder="Пошук..." bordered={false}  style={{marginTop: "15px", marginLeft: "45px"}}/>
                <div className={"menuAdapt"} onClick={()=>setActiveMenu(false)}>
                    <li>
                        <Link to={"/"} ><h3>Головна</h3></Link>
                    </li>
                    <li>
                        <Link to={"/politic"} ><h3>Політика</h3></Link>
                    </li >
                    <li>
                        <Link to={"/society"} ><h3>Суспільство</h3></Link>
                    </li>
                    <li>
                        <Link to={"/covid"} ><h3>Covid</h3></Link>
                    </li>
                    <li>
                        <Link to={"/sport"} ><h3>Спорт</h3></Link>
                    </li>
                    <li>
                        <Link to={"/media"} ><h3>Шоу-бізнес</h3></Link>
                    </li>
                    <li>
                        <Link to={"/live-news"} ><h3>LiveNews</h3></Link>
                    </li>
                    <li>
                        <Link to={"/profile/" + JSON.parse(localStorage.getItem("userId"))} ><h3>Профіль</h3></Link>
                    </li>
                    <Button className={"proposeMob"} type="dashed" shape="round">
                        <Link to={"/propose"}><h3><PlusOutlined />Запропонувати</h3></Link>
                    </Button>
                </div>
            </div>
        {/*)}*/}
        </>

    );
};

export default Navbar;
