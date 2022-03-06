import React, {useEffect, useState} from 'react';
import CardM from "../../Card/Card";
import axios from "axios";

const Sport = () => {

    const [name, setName] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/api/get', {
            params: {
                id: 4
            }
        })
            .then((response)=>{
                setName(response.data)
            })
    }, [])

    return(
        <CardM name={name}/>
    )
};

export default Sport;
