import React, {useEffect, useState} from 'react';
import axios from "axios";
import CardSpec from "../../Card/CardSpec";
import {ENV} from "../../env";
const JustNews = () => {
    const [name, setName] = useState([]);

    useEffect(()=>{
        window.scrollTo(0, 0)
        axios.get(ENV +'/api/get', {
            params: {
                id: 1
            }
        },{withCredentials: true})
            .then((response)=>{
                setName(response.data)
            })
    }, [])

    if(!name){
        return "LOading"
    }

    return (
        <>
            <CardSpec name={name}/>
        </>
    );
};

export default JustNews;
