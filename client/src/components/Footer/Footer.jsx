import React from 'react';
import {Col, Divider, Row, Space, Typography} from "antd";
import {Link} from "react-router-dom";
import './footer.css'

const {Text, Title} = Typography

const Footer = () => {
    let accessToken = JSON.parse(localStorage.getItem("access-token"))

    return (
        <footer className="footer">
            <Divider />
            <Col span={6}>
            </Col>

            <Row className="footer__nav">
                <Col className="nav__item">
                    <h2 className="nav__title">Розділи</h2>

                    <Col className="nav__ul">
                        <li>                        <Link to={"/"}>Головна</Link>
                        </li>
                        <li>                        <Link to={"/politic"}>Політика</Link>
                        </li>
                        <li>                        <Link to={"/society"}>Суспільство</Link>
                        </li>
                        <li>                        <Link to={"/сovid"}>Covid</Link>
                        </li>
                        <li>                        <Link to={"/sport"}>Спорт</Link>
                        </li>
                        <li>                        <Link to={"/media"}>Шоу-бізнес</Link>
                        </li>
                        <li>                        <Link to={"/live-news"}>LiveNews</Link>
                        </li>
                    </Col>
                </Col>
                <Col className="nav__item">
                    <h2 className="nav__title">Корисна інфо.</h2>

                    <Col className="nav__ul">
                        <li>                        <Link to={"/propose"}>Запропонувати</Link>
                        </li>
                        <li>                        <Link to={"/propose-live"}>LiveNews</Link>
                        </li>
                        <li>                        <Link to={"/registration"}>Реєстрація</Link>
                        </li>
                        <li>                        <Link to={"/login"}>Вхід</Link>
                        </li>
                        {
                            accessToken ? <li style={{cursor: "pointer"}} onClick={()=>
                            {
                                localStorage.clear()
                                window.location.reload(false)
                            }
                            }>Вихід</li> : <></>
                        }

                    </Col>
                </Col>

                <Col className="nav__item">
                    <h2 className="nav__title">Зв'язок</h2>

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


