import React, {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import NewsTop from "./components/News/Top/NewsTop";
import JustNews from "./components/News/JustNews/JustNews";
import Covid from "./components/News/Covid/Covid";
import War from "./components/News/War/War";
import Footer from "./components/Footer/Footer";
import CardDetails from "./components/CardDetails/CardDetails";
import Sport from "./components/News/Sport/Sport";
import Media from "./components/News/Media/Media";
import Propose from "./components/Propose/Propose";
import Admin from "./components/Admin/Admin";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
import LiveNews from "./components/News/LiveNews/LiveNews";
import ProposeLive from "./components/ProposeLive/ProposeLive";
import User from "./components/Profile/User";
import Profile from "./components/Profile/Profile";


function App() {

    return (

    <div className="App">
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

                <Route exact path={"/propose"} element={<Propose />}/>
                <Route exact path={"/propose-live"} element={<ProposeLive />}/>

                <Route exact path={"/live-news"} element={<LiveNews />}/>

                <Route exact path={"/user/:id"} element={<User />}/>
                <Route exact path={"/profile/:id"} element={<Profile />}/>

                <Route exact path={"/admin"} element={<Admin />}/>

                <Route exact path={"/login"} element={<Login />}/>
                <Route exact path={"/registration"} element={<Registration />}/>

            </Routes>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
