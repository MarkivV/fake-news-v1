import React from 'react';
import {Carousel} from "antd";
import "./slider.css"


const items = [
    {
        title: "Путин пососал старую валыну Бидона! Как на это отреагировал Илья Кива?",
        background: "bidon.jpeg"
    },
    {
        title: "Путин пососал старую валыну Бидона! Как на это отреагировал Илья Кива?",
        background: "bidon.jpeg"
    },
    {
        title: "Путин пососал старую валыну Бидона! Как на это отреагировал Илья Кива?",
        background: "bidon.jpeg"
    }]



const Slider = () => {
    return (
        <div style={{width: "998px", height: "350px", marginBottom: "15px"}} >
            <Carousel autoplay>
                {items.map(item => (
                    <div>
                        <img src={process.env.PUBLIC_URL + `/imgs/`+ item.background} key={"bidon"} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
