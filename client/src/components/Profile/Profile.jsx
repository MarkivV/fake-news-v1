import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ENV} from "../env";
import CardSpec from "../Card/CardSpec";
import {Divider} from "antd";
import Card from "../Card/Card";
// import {verify} from "jsonwebtoken";

const Profile = () => {

    const navigate = useNavigate()
    const [userId, setUserId] = useState('');
    const [news, setNews] = useState([]);
    const [newsProp, setNewsProp] = useState([]);
    const [name, setName] = useState('');

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //     let accessToken = JSON.parse(localStorage.getItem("access-token"))
    //     if(!accessToken){
    //         navigate('/login')
    //     }
    //     // validateToken()
    // }, []);

    useEffect(()=>{
        window.scrollTo(0, 0)
        let accessToken = JSON.parse(localStorage.getItem("access-token"))
        let id = JSON.parse(localStorage.getItem("userId"))
        if(!accessToken){
            navigate('/login')
        }
        axios.get(ENV +'/api/get/profile', {
            params: {
                id: id
            }
        },{withCredentials: true})
            .then((response)=>{
                setNews(response.data)

            })

        axios.get(ENV +'/api/get/profile/propose', {
            params: {
                id: id
            }
        },{withCredentials: true})
            .then((response)=>{
                setNewsProp(response.data)

            })
    }, [])

    return (
        <>
         <Card name={news} step={true}/>
            <Divider />
         <Card name={newsProp} step={false}/>
        </>
    );
};

export default Profile;
