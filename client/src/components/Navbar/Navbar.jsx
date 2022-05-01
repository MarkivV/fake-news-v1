import React, {useEffect, useState} from 'react';
import "./Navbar.css"
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Input, Menu, Dropdown} from "antd";
import { PlusOutlined, CaretDownOutlined} from "@ant-design/icons";
import {ENV} from "../env";

const Navbar = () => {


    const [activeMenu, setActiveMenu] = useState(false);
    // const [screenSize, setScreenSize] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    // const [username, setUsername] = useState('');
    let accessToken = JSON.parse(localStorage.getItem("access-token"))



    useEffect(() => {
        // const handleResizeFunc = () =>{
        //     setScreenSize(window.innerWidth)
        // }

        const imageUrlLS = JSON.parse(localStorage.getItem("imageUrl"))
        setImageUrl(imageUrlLS)
        // window.addEventListener('resize', handleResizeFunc)

        // handleResizeFunc()
        // return () => window.removeEventListener('resize', handleResizeFunc)

    }, []);

    const menu = (
        <Menu>
            <Menu.Item>
                {
                    accessToken ? <h2 style={{cursor: "pointer"}} onClick={()=>
                    {
                        localStorage.clear()
                        window.location.reload(false)
                    }
                    }>Вихід</h2> : <></>
                }
            </Menu.Item>
            <Menu.Item>
                {
                    accessToken ? <h2 style={{cursor: "pointer"}} onClick={()=>
                    {
                        localStorage.clear()
                        window.location.reload(false)
                    }
                    }>Вихід</h2> : <></>
                }
            </Menu.Item>
            <Menu.Item>
                {
                    accessToken ? <h2 style={{cursor: "pointer"}} onClick={()=>
                    {
                        localStorage.clear()
                        window.location.reload(false)
                    }
                    }>Вихід</h2> : <></>
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

            <Col className={"menu-main"} style={{position: "fixed"}}>
                <li className={"menu-lines"} onClick={()=>setActiveMenu(!activeMenu)}>
                    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="25" height="3" rx="1.5" fill="black"/>
                        <rect y="8" width="25" height="3" rx="1.5" fill="black"/>
                        <rect y="16" width="25" height="3" rx="1.5" fill="black"/>
                    </svg>
                </li>
                <Link to={"/"} className={"logoKik"}>
                    <li style={{marginLeft: "55px"}} >
                        <svg width="90" height="40" viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="40" width="10" height="10" rx="5" fill="#FFB1B1"/>
                            <rect width="10" height="10" fill="black"/>
                            <rect y="30" width="10" height="10" fill="black"/>
                            <rect y="20" width="10" height="10" fill="black"/>
                            <rect x="20" y="30" width="10" height="10" fill="black"/>
                            <rect x="40" y="30" width="10" height="10" fill="black"/>
                            <rect x="40" y="20" width="10" height="10" fill="black"/>
                            <rect x="40" y="15" width="10" height="5" fill="black"/>
                            <rect x="20" width="10" height="10" fill="black"/>
                            <rect x="10" y="20" width="10" height="10" fill="black"/>
                            <rect y="10" width="10" height="10" fill="black"/>
                            <rect x="60" width="10" height="10" fill="black"/>
                            <rect x="60" y="30" width="10" height="10" fill="black"/>
                            <rect x="60" y="20" width="10" height="10" fill="black"/>
                            <rect x="80" y="30" width="10" height="10" fill="black"/>
                            <rect x="80" y="10" width="10" height="10" fill="black"/>
                            <rect x="70" y="20" width="10" height="10" fill="black"/>
                            <rect x="60" y="10" width="10" height="10" fill="black"/>
                            <path d="M20 10V20L30 10H20Z" fill="black"/>
                        </svg>

                    </li>
                </Link>

                <Input className={"inputClass"} placeholder="Пошук..." bordered={false} />
                <Button className={"proposeDesc"} type="dashed" shape="round" style={{marginLeft: "15px"}}>
                    <Link to={"/propose"}><h4><PlusOutlined />Запропонувати</h4></Link>
                </Button>

                <div style={{display: "flex", marginLeft: "auto", alignItems: "center"}}>
                    <Link to={"/profile/" + JSON.parse(localStorage.getItem("userId"))}>
                        <Avatar shape="circle" size={48} src={ENV +`/images/${imageUrl}`} />
                    </Link>
                    <Dropdown  overlay={menu}>
                        <div style={{marginLeft: "10px", transform: "scale(1.2)"}} onClick={e => e.preventDefault()}>
                            <CaretDownOutlined />
                        </div>
                    </Dropdown>
                </div>
            </Col>
            <div className={activeMenu ? "menu-items active" : "menu-items"} >
                <div className={"menuAdapt"} onClick={()=>setActiveMenu(false)}>
                    <Input className={"inputClass"} placeholder="Пошук..." bordered={false}  style={{marginTop: "15px", marginLeft: "45px"}}/>

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
