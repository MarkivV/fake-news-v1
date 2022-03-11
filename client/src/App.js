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
import Sport from "./components/News/Sport/Sport";
import Media from "./components/News/Media/Media";


const {Option} = Select

function App() {

    return (

    <div className="App">
      <Header/>
            <Navbar/>
        <div className="routes" >
            <Routes>
                <Route exact path={"/"} element={<NewsTop />}/>
                <Route exact path={"/:id"} element={<CardDetails />}/>

                <Route exact path={"/politic"} element={<JustNews/>}/>
                <Route exact path={"/politic/:id"} element={<CardDetails/>}/>

                <Route exact path={"/society"} element={<War/>}/>
                <Route exact path={"/society/:id"} element={<CardDetails/>}/>

                <Route exact path={"/covid"} element={<Covid/>}/>
                <Route exact path={"/covid/:id"} element={<CardDetails/>}/>

                <Route exact path={"/sport"} element={<Sport />}/>
                <Route exact path={"/sport/:id"} element={<CardDetails />}/>

                <Route exact path={"/media"} element={<Media />}/>
                <Route exact path={"/media/:id"} element={<CardDetails />}/>

            </Routes>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
