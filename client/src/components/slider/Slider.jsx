import React, {useState} from 'react';
import {Carousel} from "antd";
import "./slider.css"
import {Link} from "react-router-dom";

const Slider = ({name}) => {

    return (
        <div style={{width: "998px", height: "450px", marginBottom: "15px"}} >
            <Carousel autoplay>
                {name.slice(0,5).map(item => (
                    <div className={"image"}>
                        <Link to={`${item.id}`}>
                        <img src={item.image} key={"bidon"} />
                        <h2 style={{color: "#fff", fontWeight: "bold"}}>{item.name}</h2>
                        </Link>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
