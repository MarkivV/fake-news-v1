import React, {useEffect, useState, createElement} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {Col, Divider, Row, Typography, Comment, Tooltip, Avatar, Input, Button} from "antd";
import LastNews from "../LastNews/LastNews";
import './CardDetails.css'
import {ENV} from "../env";
import moment from "moment";
import {
    ExclamationCircleOutlined,
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,

} from "@ant-design/icons";
const {Title} = Typography



const CardDetails = () => {
    const [item, setItem] = useState([]);
    const [name, setName] = useState([]);
    let {id} = useParams()
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    const [isAuth, setIsAuth] = useState(true);

    const [comment, setComment] = useState(false);



    useEffect(() => {
        const handleResizeFunc = () =>{
            setScreenSize(window.innerWidth)
        }
        let auth = JSON.parse(localStorage.getItem("userId"))

        if(auth){
            setIsAuth(true)
        }else {
            setIsAuth(false)
        }

        window.addEventListener('resize', handleResizeFunc)

        handleResizeFunc()
        return () => window.removeEventListener('resize', handleResizeFunc)

    }, []);


    useEffect(()=> {
        if(screenSize < 768){
            setActiveMenu(false)
        }else{
            setActiveMenu(true)
        }
    }, [screenSize])


    useEffect(() => {
        axios.get(ENV + '/api/get/item', {
            params: {
                id: id
            }
        },{withCredentials: true})
            .then((response) => {
                setItem(response.data)
                console.log(response.data)
            })

        axios.get(ENV + '/api/get/comments', {
            params: {
                id: id
            }
        },{withCredentials: true})
            .then((response) => {
                setComments(response.data)
            })
    }, [])

    useEffect(()=>{
        axios.get(ENV + '/api/get/all',{withCredentials: true})
            .then((response)=>{
                setName(response.data)
            })
    }, [])


    const setValues = () => {
        axios.post(ENV +'/api/post/comment',
            {authorId:JSON.parse(localStorage.getItem("userId")), cardId: id,  text: comment}, {withCredentials: true}).then(
                    setComments([...comments, {authorId: JSON.parse(localStorage.getItem("userId")), cardId: id,  text: comment, username: JSON.parse(localStorage.getItem("username")), avatar: JSON.parse(localStorage.getItem("imageUrl"))}])
                )
    }




    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike" >
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
      </span>
        </Tooltip>,
    ];



    const datePublish = (date) => {
        moment.locale("ru");
        return moment(date).format('l')
    }


    return (
        <Row gutter={[24,24]}>
            {
                activeMenu
                    ?
                    <>
                        <Col span={16}>
                            {item.slice(0,1).map(i=>(
                                <div style={{marginTop: "17px"}}  key={i.id}>
                                    <Title level={2}>{i.name}</Title>
                                    <Divider/>
                                    <div>
                                        <img style={{width: "100%", height: "550px"}} src={i.image} alt={"img"}/>
                                    </div>
                                    {/*<div style={{display: "flex", alignItems: "center"}}>*/}
                                    {/*    <Title style={{marginTop: "15px"}} mark level={3}>{i.category}</Title>*/}
                                    {/*    /!*<HeartOutlined style={{transform: "scale(1.8)", marginLeft: "auto", marginRight: "15px"}}/>*!/*/}
                                    {/*    /!*<h5>{i.likes}</h5>*!/*/}
                                    {/*</div>*/}
                                    <div style={{display: "flex", marginTop: "30px"}}>
                                        <h3 style={{backgroundColor: "#FADE98", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px"}}>{i.category}</h3>
                                        <h3 style={{marginLeft: "15px"}}>{datePublish(i.datePublished)}</h3>
                                        <Link style={{marginLeft: "15px"}} to={`/user/${i.authorId}`}>
                                            <h3> Автор: {i.username}</h3>
                                        </Link>
                                    </div>
                                    <Divider />
                                    <p style = {{fontSize: "20px", marginTop: "15px", whiteSpace: "pre-line"}}>
                                        {i.description}
                                    </p>
                                    <Divider/>
                                    <h4 style={{fontWeight: "bold", color: "#4f4f4f", fontStyle: "italic"}}><ExclamationCircleOutlined />  Всі статті на цьому веб-сайті вигадані, та не відповідають дійсності</h4>
                                    <div style={{display: "flex"}}>
                                        <Input bordered={false}  placeholder={isAuth ? "Напишіть Ваш коментар" : "Ввійдіть щоб написати"} style={{width: "100%", backgroundColor: "#fcfcfc"}} onChange={(e)=>setComment(e.target.value)}/>
                                        <Button disabled={!isAuth || !comment} type={"dashed"} style={{marginLeft: "10px"}} onClick={()=>setValues()} >Опублікувати</Button>
                                    </div>
                                    <div className={"comments"}>
                                        {
                                            comments.map((comments)=>(
                                                <Comment
                                                    actions={actions}
                                                    author={<a>{comments.username}</a>}
                                                    avatar={<Avatar src={ENV +`/images/${comments.avatar}`} alt={comments.username} />}
                                                    content={
                                                        <p style={{fontSize: "17px"}}>
                                                            {
                                                                comments.text
                                                            }
                                                        </p>
                                                    }
                                                    datetime={
                                                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                                            <span>{moment(comments.datePublished).fromNow('L')}</span>
                                                        </Tooltip>
                                                    }
                                                />
                                            ))
                                        }
                                    </div>
                                </div>

                            ))
                            }
                        </Col>
                        <Col span={8}>
                            <LastNews name={name}/>
                        </Col>
                    </>
                    :
                    <>
                        <Col span={24}>
                            {item.slice(0,1).map(i=>(
                                <div key={i.id}>
                                    <div>
                                        <img style={{maxWidth: "100%"}} src={i.image} alt={"img"}/>
                                    </div>
                                    <Title mark level={3} style={{marginTop: "15px"}}>{i.category}</Title>
                                    <Title style={{fontSize: "22px",  textAlign: "justify"}}>{i.name}</Title>
                                    <div style={{display: "flex", marginTop: "15px"}}>
                                        <h4>Автор: {i.author}</h4>
                                        <h4 style={{marginLeft: "auto"}}>{moment(i.datePublished).format('L')}</h4>
                                    </div>
                                    <p style = {{fontSize: "18px", marginTop: "15px", textAlign: "justify", whiteSpace: "pre-line"}}>
                                        {i.description}
                                    </p>
                                    <Divider/>
                                    <h5 style={{fontWeight: "bold", color: "#4f4f4f"}}><ExclamationCircleOutlined />  Всі статті на цьому веб-сайті вигадані, та не відповідають дійсності</h5>
                                    <div >
                                        <Input bordered={false} placeholder={isAuth ? "Напишіть Ваш коментар" : "Ввійдіть щоб написати"} style={{width: "100%", backgroundColor: "#fcfcfc"}} onChange={(e)=>setComment(e.target.value)}/>
                                        <Button disabled={!isAuth || !comment} type={"dashed"} style={{marginLeft: "10px"}} onClick={()=>setValues()} >Опублікувати</Button>
                                    </div>
                                    <div className={"comments"}>
                                        {
                                            comments.map((comments)=>(
                                                <Comment
                                                    actions={actions}
                                                    author={<h4>{comments.username}</h4>}
                                                    avatar={<Avatar src={ENV +`/images/${comments.avatar}`} alt={comments.username} />}
                                                    content={
                                                        <p style={{fontSize: "17px"}}>
                                                            {
                                                                comments.text
                                                            }
                                                        </p>
                                                    }
                                                    datetime={
                                                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                                            <span>{moment(comments.datePublished).fromNow('L')}</span>
                                                        </Tooltip>
                                                    }
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                            }
                        </Col>
                    </>
            }


        </Row>
    );
};

export default CardDetails;
