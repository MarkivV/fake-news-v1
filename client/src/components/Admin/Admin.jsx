import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Col, Row, Select, Skeleton, Typography} from "antd";

const {Text, Title} = Typography
const {Option} = Select

const Admin = () => {
    const [proposes, setProposes] = useState([]);

    useEffect(()=>{
        axios.get('https://lattersreact.herokuapp.com/api/get/propose',{withCredentials: true})
            .then((response)=>{
                setProposes(response.data)
                console.log(response.data)
            })
    }, [])

    const Publish = (news) => {
        axios.post('https://lattersreact.herokuapp.com/api/publish/item',
            {
                author: news.author,
                image: news.image,
                title: news.name,
                 text: news.description,
                categoryId: news.categoryId
            })
        axios.delete(`https://lattersreact.herokuapp.com/api/delete/${news.id}`)
    }

    const Delete = (news) =>{
        axios.delete(`https://lattersreact.herokuapp.com/api/delete/${news.id}` )
    }

    if(!proposes){
        return <Skeleton />
    }


    return (
        <Row gutter={[24,24]}>
            {
                proposes.map((news)=>(

                    <Col xs={24} sm={24} lg={12} key={news.id}>
                        {/*<div className={"card"}>*/}
                            <Card hoverable className={"news-card"}>
                                    <div className="news-image-container">
                                        <img style={{maxWidth: '100%'}} src={news.image} alt={"news"}/>
                                    </div>

                                    <Title className={"news-title"} level={8}>{news.name}</Title>
                                    <p>{news.description}</p>
                                    <Title mark level={4}>{news.category}</Title>
                                {/*</div>*/}
                                <Button type="primary" onClick={()=>
                                    Publish(news)
                                }

                                >
                                    Опубликовать
                                </Button>
                            </Card>

                    </Col>
                ))
            }
        </Row>
    );
};

export default Admin;
