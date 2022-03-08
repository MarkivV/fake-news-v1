import React, {useEffect, useState} from 'react';
import { Pagination } from 'antd';
import './Paginate.css'

const Paginate = ({postsPerPage, totalPosts, paginate}) => {

    const pageNumbers = []

    for (let i = 1; i <=Math.ceil(totalPosts/postsPerPage); i++) {
        pageNumbers.push(i)
    }

    // const [width, setWidth] = useState(window.innerWidth)
    //
    //
    // let updateDimension = () =>{
    //     setWidth(window.innerWidth)
    // }
    //
    // useEffect(()=>{
    //     window.addEventListener("resize", updateDimension)
    //     return () => window.removeEventListener("resize", updateDimension)
    //
    // }, [])

    return (
        <>
            <div className="pagination">
                <a href="#">&laquo;</a>
                {
                    pageNumbers.map(num =>  (
                            <a onClick={()=>paginate(num)} href="#" className={"page-link"}>
                                {num}
                            </a>
                    ))
                }
                <a href="#">&raquo;</a>
            </div>
        </>
    );
};

export default Paginate;
