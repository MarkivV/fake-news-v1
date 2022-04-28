import React, {useEffect, useState} from 'react';
import {Col, Row, Typography} from "antd";
import moment from "moment";
import './card.css'
import {Link} from "react-router-dom";
const {Text, Title} = Typography

const CardSpec = ({name}) => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);


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
        <Row gutter={[24,24]}>

            {
                name.map((news)=>(

                        activeMenu
                        ?
                        <>
                            <Col xs={24} sm={12} lg={8} key={news.id}>
                                <Link to={`${news.id}`}>
                                    <div >
                                        {/*<Card hoverable className={"news-card"} style={{height: "550px"}}>*/}
                                        <a href={news.url} target={"_blank"} rel={"noreferrer"}>
                                            <div className="news-image-container">
                                                <img style={{width: '100%', height: "300px", objectFit: "cover"}} src={news.image} alt={"news"}/>
                                            </div>
                                            <div >
                                                <Title level={3}>{news.name}</Title>
                                            </div>
                                            <div style={{marginTop: "10px"}} className="provider-container">
                                                <Text>{moment(news.datePublished).format('L')}</Text>
                                                    <Link to={`/user/${news.authorId}`}>
                                                    <h5>Автор: {news.username}</h5>
                                                    </Link>
                                            </div>
                                        </a>
                                    </div>
                                    {/*</Card>*/}
                                </Link>
                            </Col>
                        </>
                        :
                        <>
                            <Col xs={24} sm={12} lg={8} key={news.id}>
                                <Link to={`${news.id}`}>
                                    <div>
                                        {/*<Card hoverable className={"news-card"} style={{height: "550px"}}>*/}
                                        <a href={news.url} target={"_blank"} rel={"noreferrer"}>
                                            <div className="news-image-container">
                                                <img style={{width: '100%'}} src={news.image} alt={"news"}/>
                                            </div>
                                            <div style={{marginLeft: "0px"}}>
                                                <Title level={3}>{news.name}</Title>
                                            </div>
                                            <div style={{marginLeft: "0px", marginTop: "10px"}} className="provider-container">
                                                <Text>{moment(news.datePublished).format('L')}</Text>
                                                <Link to={`/user/${news.authorId}`}>
                                                    <h5>Автор: {news.username}</h5>
                                                </Link>
                                            </div>
                                        </a>
                                    </div>
                                    {/*</Card>*/}
                                </Link>
                            </Col>
                        </>


                ))
            }
        </Row>
    );
};

export default CardSpec;
