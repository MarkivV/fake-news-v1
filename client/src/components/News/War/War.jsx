import React, {useEffect, useState} from 'react';
import axios from "axios";
import CardSpec from "../../Card/CardSpec";

const War = () => {
    const [name, setName] = useState([]);

    useEffect(()=>{
        axios.get('https://lattersreact.herokuapp.com/api/get', {
            params: {
                id: 2
            }
        },{withCredentials: true})
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
