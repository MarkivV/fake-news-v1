import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ENV} from "../env";
import {Link, useParams} from "react-router-dom";
import CardSpec from "../Card/CardSpec";
import {Col, Row} from "antd";
import moment from "moment";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

const User = () => {

    const [news, setNews] = useState([]);
    const [name, setName] = useState('');
    const {id} = useParams()
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(()=>{
        window.scrollTo(0, 0)
        axios.get(ENV +'/api/get/user', {
            params: {
                idUser: id
            }
        },{withCredentials: true})
            .then((response)=>{
                setNews(response.data)
                setName(response.data[0].username)

            })
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0)
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
            <Title level={1}>{name}</Title>
            <Row gutter={[24,24]}>
            {
                news.map((item)=>(

                    activeMenu
                        ?

                        <>
                            <Col xs={24} sm={12} lg={8} key={news.id}>
                                <a href={`/${item.id}`}>
                                    <div >
                                        {/*<Card hoverable className={"news-card"} style={{height: "550px"}}>*/}
                                        <a href={item.url} target={"_blank"} rel={"noreferrer"}>
                                            <div className="news-image-container">
                                                <img style={{width: '100%', height: "300px", objectFit: "cover"}} src={item.image} alt={"news"}/>
                                            </div>
                                            <div >
                                                <Title level={2}>{item.name}</Title>
                                            </div>
                                            <div style={{marginTop: "10px"}} className="provider-container">
                                                <Text>{moment(item.datePublished).format('L')}</Text>
                                            </div>
                                        </a>
                                    </div>
                                    {/*</Card>*/}
                                </a>
                            </Col>
                        </>
                        :
                        <>
                            <Col xs={24} sm={12} lg={8} key={news.id}>
                                <a href={`/${item.id}`}>
                                    <div>
                                        {/*<Card hoverable className={"news-card"} style={{height: "550px"}}>*/}
                                        <a href={item.url} target={"_blank"} rel={"noreferrer"}>
                                            <div className="news-image-container">
                                                <img style={{width: '100%'}} src={item.image} alt={"news"}/>
                                            </div>
                                            <div style={{marginLeft: "0px"}}>
                                                <Title level={4}>{item.name}</Title>
                                            </div>
                                            <div style={{marginLeft: "0px", marginTop: "10px"}} className="provider-container">
                                                <Text>{moment(item.datePublished).format('L')}</Text>
                                            </div>
                                        </a>
                                    </div>
                                    {/*</Card>*/}
                                </a>
                            </Col>
                        </>


                ))
            }
        </Row>
        </>
    );
};

export default User;
