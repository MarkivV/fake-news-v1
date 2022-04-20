import React, {useState} from 'react';
import {Carousel, Col, Row} from "antd";
import './Slider.css'
import {Link} from "react-router-dom";

const Slider = ({name}) => {

    return (
        <div className={"slider"} style={{height: "450px", marginBottom: "15px"}} >
            <Carousel>
                {name.slice(0,5).map(item => (
                    <div className={"image"} key={item.id}>
                        <Link to={`${item.id}`}>
                            <img src={item.image} alt={item.name} />
                            <h2 style={{color: "#fff", fontWeight: "bold"}}>{item.name}</h2>
                        </Link>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
