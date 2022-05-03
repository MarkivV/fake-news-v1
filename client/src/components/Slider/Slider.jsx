import React from 'react';
import {Carousel} from "antd";
import './Slider.css'
import {Link} from "react-router-dom";

const Slider = ({name}) => {

    return (
        <div className={"slider"}  >
            <Carousel>
                {name.slice(0,5).map(item => (
                    <div className={"imageSli"} key={item.id}>
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
