import React, {useEffect, useState} from 'react';
import "./Navbar.css"
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Input, Menu, Dropdown, AutoComplete} from "antd";
import { PlusOutlined, CaretDownOutlined} from "@ant-design/icons";
import {ENV} from "../env";
import axios from "axios";
import logo from "../../frame.png"

const Navbar = () => {


    const [activeMenu, setActiveMenu] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const [news, setNews] = useState([]);

    let accessToken = JSON.parse(localStorage.getItem("access-token"))



    useEffect(() => {
        const imageUrlLS = JSON.parse(localStorage.getItem("imageUrl"))
        setImageUrl(imageUrlLS)

        axios.get(ENV + '/api/get/all',{withCredentials: true})
            .then((response)=>{
                setNews(response.data)
            })

    }, []);

    const menu = (
        <Menu>
            <Menu.Item>
                {
                    accessToken ? <h4 style={{cursor: "pointer"}} onClick={()=>
                    {
                        localStorage.clear()
                        window.location.reload(false)
                    }
                    }>Вихід</h4> : <></>
                }
            </Menu.Item>
        </Menu>
    );

    // const onSearch = (searchTerm) => {
    //     setOptions(
    //         news.filter((val)=>{
    //             return val.username === searchTerm
    //         })
    //     )
    // }


    return (
        <>
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
                        <img style={{width: "50px"}} src={logo} alt=""/>
                    </li>
                </Link>

                {/*<AutoComplete options={options} onSearch={onSearch} onChange={event => setSearchTerm(event.target.value)}/>*/}
                <Input className={"inputClass"} placeholder="Пошук..." bordered={false} onChange={event => setSearchTerm(event.target.value)}/>
                    <div className={"searchParent"}>
                    {
                        news.filter((val)=>{
                            if(searchTerm === ''){
                                return ''
                            }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                return val
                            }
                        }).slice(0,5).map((item)=>(
                            <a href={`${item.id}`}>
                            <div className={"searchDiv"} style={{display: "flex", marginTop: "10px"}}>
                                <div>
                                    <img style={{width: '100px', height: '60px', objectFit: "cover"}} src={item.image} alt={"news"}/>
                                </div>
                                <div style={{marginLeft: "10px"}}>
                                   <h5>{item.name}</h5>
                                </div>
                            </div>
                            </a>
                        ))
                    }
                    </div>


                <Button className={"proposeDesc"} type="dashed" shape="round" style={{marginLeft: "15px"}}>

                    <Link to={"/propose"}><h4><PlusOutlined />Запропонувати</h4></Link>

                </Button>

                <div className={accessToken ? "avatarExist" : "avatarNone"}>

                    <Link to={"/profile/" + JSON.parse(localStorage.getItem("userId"))}>
                        <Avatar shape="circle" size={48} src={ENV +`/images/${imageUrl}`} />
                    </Link>
                    <Dropdown  overlay={menu}>
                        <div style={{marginLeft: "10px"}} onClick={e => e.preventDefault()}>
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
                        <Link to={"/propose"}><h4><PlusOutlined />Запропонувати</h4></Link>
                    </Button>

                </div>

            </div>
        </>

    );
};

export default Navbar;
