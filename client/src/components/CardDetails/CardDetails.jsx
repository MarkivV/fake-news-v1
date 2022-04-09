import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Col, Row, Typography} from "antd";
import LastNews from "../LastNews/LastNews";
import './CardDetails.css'
import {ENV} from "../env";

const {Text, Title} = Typography


const CardDetails = () => {
    const [item, setItem] = useState([]);
    const [name, setName] = useState([]);
    let {id} = useParams()
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


    useEffect(() => {
        axios.get(ENV + '/api/get/item', {
            params: {
                id: id
            }
        },{withCredentials: true})
            .then((response) => {
                setItem(response.data)
                console.log(response.data)
            })
    }, [])

    useEffect(()=>{
        axios.get(ENV + '/api/get/all',{withCredentials: true})
            .then((response)=>{
                setName(response.data)
            })
    }, [])

    return (
        <Row gutter={[24,24]}>
            {
                activeMenu
                    ?
                    <>
                        <Col span={16}>
                            {item.slice(0,1).map(i=>(
                                <div key={i.id}>
                                    <div>
                                        <img style={{width: "100%"}} src={i.image} alt="image"/>
                                    </div>
                                    <Title mark level={4}>{i.category}</Title>
                                    <Title>{i.name}</Title>
                                    <hr/>
                                    <p style = {{fontSize: "30px", marginTop: "15px"}}>
                                        {i.description}
                                    </p>
                                </div>
                            ))
                            }
                        </Col>
                        <Col span={8}>
                            <LastNews name={name}/>
                        </Col>
                    </>
                    :
                    <>
                        <Col span={24}>
                            {item.slice(0,1).map(i=>(
                                <div key={i.id}>
                                    <div>
                                        <img style={{maxWidth: "100%"}} src={i.image} alt="image"/>
                                    </div>
                                    <Title mark level={3}>{i.category}</Title>
                                    <Title style={{fontSize: "27px",  textAlign: "justify"}}>{i.name}</Title>
                                    <hr/>
                                    <p style = {{fontSize: "20px", marginTop: "15px", textAlign: "justify"}}>
                                        {i.description}
                                    </p>
                                </div>
                            ))
                            }
                        </Col>
                    </>
            }


        </Row>
    );
};

export default CardDetails;
