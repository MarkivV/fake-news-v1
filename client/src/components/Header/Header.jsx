import React, {useEffect, useState} from 'react';
import {Col, Row, Select} from "antd";
import axios from "axios";
import styles from './Header.css'
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <div className={"header"}>
            <Link to={"/"}>
            <h1 style={{color: "#5CACEE"}}>MPapper</h1>
            </Link>
        </div>
    );
};

export default Header;
