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
import {Col, Row, Select} from "antd";


const {Option} = Select

function App() {

    return (

    <div className="App">
      <Header/>
            {/*<Col span={24} className={"lang-select"}>*/}
            {/*    <Select*/}
            {/*        showSearch*/}
            {/*        className={"select-news"}*/}
            {/*        placeholder={"Choose language"}*/}
            {/*        optionFilterProp={"children"}*/}
            {/*        onChange={(value)=>setLang(value)}*/}
            {/*    >*/}
            {/*            <Option value={'en'}>English</Option>*/}
            {/*            <Option value={'ru'}>Русский</Option>*/}
            {/*            <Option value={'ua'}>Українська</Option>*/}
            {/*    </Select>*/}
            {/*</Col>*/}
            <Navbar/>
        <div className="routes">
            <Routes>
                <Route exact path={"/"} element={<NewsTop />}>
                </Route>
                <Route exact path={"/politic"} element={<JustNews/>}>
                </Route>
                <Route exact path={"/society"} element={<Covid/>}>
                </Route>
                <Route exact path={"/covid"} element={<War/>}>
                </Route>
                <Route exact path={"/sport"} element={<About />}>
                </Route>
                <Route exact path={"/media"} element={<About />}>
                </Route>
            </Routes>
        </div>

    </div>
  );
}

export default App;
