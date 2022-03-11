import React, {useEffect, useState} from 'react';
import CardM from "../../Card/Card";
import axios from "axios";
import CardSpec from "../../Card/CardSpec";

const War = () => {
    const [name, setName] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/api/get', {
            params: {
                id: 2
            }
        })
            .then((response)=>{
                setName(response.data)
            })
    }, [])


return(
    <>
        <CardSpec name={name}/>
    </>
)
};

export default War;
