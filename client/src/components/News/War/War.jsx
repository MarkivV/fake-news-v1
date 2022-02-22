import React, {useEffect, useState} from 'react';
import CardM from "../../Card/Card";
import axios from "axios";

const War = () => {
    const [name, setName] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/api/get')
            .then((response)=>{
                setName(response.data)
            })
    }, [])


return(
    <>
        <CardM name={name}/>
    </>
)
};

export default War;
