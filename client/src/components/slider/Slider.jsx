import React, {useState} from 'react';
import {Carousel} from "antd";
import "./slider.css"

const Slider = ({name}) => {

    return (
        <div style={{width: "998px", height: "350px", marginBottom: "15px"}} >
            <Carousel autoplay>
                {name.slice(0,5).map(item => (
                    <div className={"image"}>
                        <img src={item.image} key={"bidon"} />
                        <h2 style={{color: "#fff", fontWeight: "bold"}}>{item.name}</h2>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
