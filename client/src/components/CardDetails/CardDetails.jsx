import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Col, Row, Typography} from "antd";
import LastNews from "../LastNews/LastNews";

const {Text, Title} = Typography


const CardDetails = () => {
    const [item, setItem] = useState([]);
    const [name, setName] = useState([]);
    let {id} = useParams()


    useEffect(() => {
        axios.get('http://localhost:3001/api/get/item', {
            params: {
                id: id
            }
        })
            .then((response) => {
                setItem(response.data)
                console.log(response.data)
            })
    }, [])

    useEffect(()=>{
        axios.get('http://localhost:3001/api/get/all')
            .then((response)=>{
                setName(response.data)
            })
    }, [])

    return (
        <Row>
            <Col span={16}>
                {item.map(i=>(
                    <div key={i.id}>
                        <div>
                            <img style={{width: "1000px"}} src={i.image} alt=""/>
                        </div>
                        <Title style={{marginTop: "40px"}} level={7}>{i.name}</Title>
                        <p style = {{fontSize: "40px", marginTop: "15px"}}>
                            {i.description}
                        </p>
                    </div>
                ))
                }
            </Col>
            <Col span={8}>
                <LastNews name={name}/>
            </Col>

        </Row>
    );
};

export default CardDetails;
