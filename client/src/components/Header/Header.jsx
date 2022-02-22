import React, {useEffect, useState} from 'react';
import {Col, Row, Select} from "antd";
import axios from "axios";
import styles from './Header.css'

const Header = () => {

    return (
        <div style={{textAlign: "center"}}>
            <h1 style={{marginTop: '10px', fontWeight: 'bold'}}>Just News</h1>
                <hr/>
        </div>
    );
};

export default Header;
