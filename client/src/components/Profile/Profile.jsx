import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./profile.css"
import axios from "axios";
import {ENV} from "../env";
import {Col, Divider, Row, Avatar, Image, Upload, message, Button, Empty} from "antd";
import Card from "../Card/Card";
import Title from "antd/es/typography/Title";
import {UploadOutlined, UserOutlined} from '@ant-design/icons';
import FormItemLabel from "antd/es/form/FormItemLabel";
const ava = 'https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png'


const Profile = () => {

    const navigate = useNavigate()
    const [userId, setUserId] = useState('');
    const [news, setNews] = useState([]);
    const [newsProp, setNewsProp] = useState([]);
    const [user, setUser] = useState([]);
    const [name, setName] = useState('');

    const [userInfo, setUserInfo] = useState({
        file: [],
    });
    const [avatar, setAvatar] = useState('')



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
        axios.get(ENV +'/api/get/user/profile', {
            params: {
                id: id
            }
        },{withCredentials: true})
            .then((response)=>{
                setUser(response.data)
                // console.log(response.data.avatar)
            })

        axios.get(ENV +'/api/get/profile/propose', {
            params: {
                id: id
            }
        },{withCredentials: true})
            .then((response)=>{
                setNewsProp(response.data)
                // console.log(response.data)

            })
    }, [])

    const handleUploadImage = (e) => {
        setUserInfo({
            ...userInfo,
            file: e.target.files[0]
        })
    }

    const submit = async () =>{
        let id = JSON.parse(localStorage.getItem("userId"))
        const formdata = new FormData();
        formdata.append('avatar', userInfo.file);

        axios.post(ENV + "/upload/avatar",  formdata, {params: {id:id}},{
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(res => { // then print response status
                console.warn(res);
                setAvatar(res.data.pathImg)
                window.localStorage.setItem("imageUrl", JSON.stringify(res.data.pathImg))
            })
    }




    return (
        <Row gutter={[24,24]}>
            <Col xs={24} sm={24} lg={16}>
                <Card name={news} step={true}/>
                <Divider />
                <Card name={newsProp} step={false}/>
            </Col>
            <Col xs={24} sm={24} lg={8}>
                <div>
                    {
                        avatar
                            ?
                            <img style={{width: '100%', objectFit: "cover", borderRadius: "2%"}} src={ENV+`/images/${avatar}`}/>
                            :
                            user.map((img)=>(
                            <img style={{width: '100%', objectFit: "cover", borderRadius: "2%"}} src={ENV+`/images/${img.avatar}` || ava}/>

                            ))

                    }

                </div>

                <div style={{display: "flex"}}>
                    {
                        user.map((item)=>(
                            <div style={{justifyContent: "center"}} key={item.idUser}>
                                <Title level={1}>
                                    {item.username}
                                </Title>
                            </div>
                        ))
                    }
                </div>
                <div style={{marginTop: "15px", marginBottom: "10px"}}>
                    <label className={"custom-file-upload"}>
                        <input type="file" name={"avatar"} onChange={handleUploadImage} hidden/>
                        <h4><UploadOutlined />  Загрузить фото</h4>
                    </label>
                    <Button style={{marginTop: "10px"}} type="text" onClick={() => submit()}>Изменить фото</Button>
                </div>
            </Col>
        </Row>
    );
};

export default Profile;
