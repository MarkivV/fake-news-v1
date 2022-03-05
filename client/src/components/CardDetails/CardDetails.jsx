import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const CardDetails = () => {
    const [item, setItem] = useState([]);
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


    return (
        <div>
            {item.map(i=>(
                <div>
                    <h3>{i.name}</h3>
                    <img src={i.image} alt=""/>
                </div>
            ))
            }
        </div>
    );
};

export default CardDetails;
