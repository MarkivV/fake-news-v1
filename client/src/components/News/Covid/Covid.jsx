import React, {useEffect, useState} from 'react';
import CardM from "../../Card/Card";
import axios from "axios";
import CardSpec from "../../Card/CardSpec";

const Covid = () => {

    const [name, setName] = useState([]);

    useEffect(()=>{
        axios.get('https://lattersreact.herokuapp.com/api/get', {
            params: {
                id: 3
            }
        })
            .then((response)=>{
                setName(response.data)
            })
    }, [])

    return(
        <CardSpec name={name}/>
    )
};

export default Covid;
