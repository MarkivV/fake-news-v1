import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Col, Row, Typography} from "antd";
import {ENV} from './../env'
import {useNavigate} from "react-router-dom";

const {Title} = Typography


const Admin = () => {
    const [proposes, setProposes] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        window.scrollTo(0, 0)
        let admin = "58964e8e-84ae-483f-8d93-6df681ae9de6.jpg"
        // let admin = "7d9c8e2a-7ffd-4b1f-b9f3-32b28ef6edc8.jpg"
        let imageUrl = JSON.parse(localStorage.getItem("imageUrl"))
        if(imageUrl !== admin){
            navigate("/")
        }

        axios.get(ENV + '/api/get/propose',{withCredentials: true})
            .then((response)=>{
                setProposes(response.data)
                console.log(response.data)
            })
    }, [])

    const Publish = (news) => {
        axios.post(ENV + '/api/publish/item',
            {
                author: news.author,
                image: news.image,
                title: news.name,
                 text: news.description,
                categoryId: news.categoryId,
                authorId: news.authorId
            })
        axios.delete(ENV + `/api/delete/${news.id}`)
    }
    const Delete = (news) => {
        // axios.post(ENV + '/api/publish/item',
        //     {
        //         author: news.author,
        //         image: news.image,
        //         title: news.name,
        //          text: news.description,
        //         categoryId: news.categoryId,
        //         authorId: news.authorId
        //     })
        axios.delete(ENV + `/api/delete/${news.id}`)
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
                                    Опублікувати
                                </Button>
                                <Button style={{marginLeft: "15px"}} type="danger" onClick={()=>
                                    Delete(news)
                                }

                                >
                                    Видалити
                                </Button>
                            </Card>

                    </Col>
                ))
            }
        </Row>
    );
};

export default Admin;
