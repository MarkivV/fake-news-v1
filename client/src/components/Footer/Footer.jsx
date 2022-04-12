import React from 'react';
import {Col, Row, Space, Typography} from "antd";
import {Link} from "react-router-dom";
import './footer.css'

const {Text, Title} = Typography

const Footer = () => {
    let accessToken = JSON.parse(localStorage.getItem("access-token"))

    return (
        <footer className="footer">
            <Col span={6}>
                <h2 style={{fontSize: "35px"}}>Latters</h2>
            </Col>

            <Row className="footer__nav">
                <Col className="nav__item">
                    <h2 className="nav__title">Разделы</h2>

                    <Col className="nav__ul">
                        <li>                        <Link to={"/"}>Главная</Link>
                        </li>
                        <li>                        <Link to={"/politic"}>Политика</Link>
                        </li>
                        <li>                        <Link to={"/society"}>Общество</Link>
                        </li>
                        <li>                        <Link to={"/сovid"}>Ковид</Link>
                        </li>
                        <li>                        <Link to={"/sport"}>Спорт</Link>
                        </li>
                        <li>                        <Link to={"/media"}>Шоу-бизнес</Link>
                        </li>
                        <li>                        <Link to={"/live-news"}>LiveNews</Link>
                        </li>
                    </Col>
                </Col>
                <Col className="nav__item">
                    <h2 className="nav__title">Полезная инфо.</h2>

                    <Col className="nav__ul">
                        <li>                        <Link to={"/propose"}>Предложить</Link>
                        </li>
                        <li>                        <Link to={"/propose-live"}>LiveNews</Link>
                        </li>
                        <li>                        <Link to={"/registration"}>Регистрация</Link>
                        </li>
                        <li>                        <Link to={"/login"}>Вход</Link>
                        </li>
                        {
                            accessToken ? <li style={{cursor: "pointer"}} onClick={()=>
                            {
                                localStorage.clear()
                                window.location.reload(false)
                            }
                            }>Выход</li> : <></>
                        }

                    </Col>
                </Col>

                <Col className="nav__item">
                    <h2 className="nav__title">Связь</h2>

                    <Col className="nav__ul">
                        <li>
                            <a href="https://www.instagram.com/vovankuvalda/">Instagram</a>
                        </li>

                        <li>
                            <a href="https://t.me/vavankuvalda">Telegram</a>
                        </li>

                        <li>
                            <a href="#">email</a>
                        </li>
                    </Col>
                </Col>
            </Row>

        </footer>
    );
};

export default Footer;


