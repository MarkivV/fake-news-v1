import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate()


    useEffect(() => {
        window.scrollTo(0, 0)
        let accessToken = JSON.parse(localStorage.getItem("access-token"))
        if(!accessToken){
            navigate('/login')
        }
    }, []);

    return (
<></>
    );
};

export default Profile;
