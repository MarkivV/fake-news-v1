import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import {Routes, Route, Link} from "react-router-dom";
import CardM from "./components/Card/Card";
import NewsTop from "./components/News/Top/NewsTop";
import JustNews from "./components/News/JustNews/JustNews";
import Covid from "./components/News/Covid/Covid";
import War from "./components/News/War/War";
import About from "./components/News/About/About";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Row, Select, Space, Typography} from "antd";
import Footer from "./components/Footer/Footer";
import CardDetails from "./components/CardDetails/CardDetails";


const {Option} = Select

function App() {

    return (

    <div className="App">
      <Header/>
            <Navbar/>
        <div className="routes" style={{margin: "0px 10% 0px"}}>
            <Routes>
                <Route exact path={"/"} element={<NewsTop />}/>
                <Route exact path={"/:id"} element={<CardDetails />}/>

                <Route exact path={"/politic"} element={<JustNews/>}/>
                <Route exact path={"/politic/:id"} element={<CardDetails/>}/>

                <Route exact path={"/society"} element={<Covid/>}/>
                <Route exact path={"/society/:id"} element={<CardDetails/>}/>

                <Route exact path={"/covid"} element={<War/>}/>
                <Route exact path={"/covid/:id"} element={<CardDetails/>}/>

                <Route exact path={"/sport"} element={<About />}/>
                <Route exact path={"/sport/:id"} element={<CardDetails />}/>

                <Route exact path={"/media"} element={<About />}/>
                <Route exact path={"/media/:id"} element={<CardDetails />}/>

            </Routes>
        </div>
        <div className="footer">
            <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                Latters<br/>
                All rights reserved
            </Typography.Title>
            <Space>
                <Link to={"/"}>Связь</Link>
                <Link to={"/politic"}>Главная</Link>
                <Link to={"/society"}>Общество</Link>
            </Space>
        </div>
    </div>
  );
}

export default App;
