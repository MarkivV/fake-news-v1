import React, {useEffect, useState} from 'react';
import {Col, Row, Select} from "antd";
import axios from "axios";
import styles from './Header.css'
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <div className={"header"}>
            <Link to={"/"}>
                <svg width="86" height="76" viewBox="0 0 86 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="86" height="8" fill="#E9B2B2"/>
                    <rect y="12" width="86" height="8" fill="#E9B2B2"/>
                    <rect y="60" width="86" height="16" fill="#E9B2B2"/>
                    <rect x="45" y="24" width="41" height="8" fill="#FAC87E"/>
                    <rect x="45" y="36" width="41" height="8" fill="#E9B2B2"/>
                    <rect x="45" y="48" width="41" height="8" fill="#E9B2B2"/>
                    <rect y="24" width="41" height="32" fill="#5CACEE"/>
                </svg>
            <h1 style={{color: "#5CACEE"}}>Latters</h1>
            </Link>
        </div>
    );
};

export default Header;
