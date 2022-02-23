import React, {useEffect, useState} from 'react';
import CardM from "../../Card/Card";

import axios from "axios";
import Slider from "../../slider/Slider";
import {Carousel} from "antd";
const NewsTop = ({lang}) => {

    const [name, setName] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:3001/api/get')
            .then((response)=>{
                setName(response.data)
            })
    }, [])

    const contentStyle = {
        height: '360px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    return(
        <>
            {/*<Carousel autoplay>*/}
            {/*    */}
            {/*</Carousel>*/}
            <CardM name={name}/>
        </>
    )
};

export default NewsTop;
