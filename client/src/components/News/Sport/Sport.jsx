import React, {useEffect, useState} from 'react';
import axios from "axios";
import CardSpec from "../../Card/CardSpec";
import {ENV} from "../../env";

const Sport = () => {

    const [name, setName] = useState([]);

    useEffect(()=>{
        window.scrollTo(0, 0)
        axios.get(ENV +'/api/get', {
            params: {
                id: 4
            }
        },{withCredentials: true})
            .then((response)=>{
                setName(response.data)
            })
    }, [])

    return(
        <CardSpec name={name}/>
    )
};

export default Sport;
