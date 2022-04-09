import React, {useEffect, useState} from 'react';
import CardM from "../../Card/Card";
import axios from "axios";
import CardSpec from "../../Card/CardSpec";
import {ENV} from "../../env";

const Covid = () => {

    const [name, setName] = useState([]);

    useEffect(()=>{
        axios.get('https://purple-omega.vercel.app/api/get', {
            params: {
                id: 3
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

export default Covid;
