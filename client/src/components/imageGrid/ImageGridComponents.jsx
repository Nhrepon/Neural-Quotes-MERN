import React, {useEffect, useState} from 'react';
import './style.css';
import axios from "axios";
import {Link} from "react-router-dom";

const ImageGridComponents = () => {

    const data = [
        {
            title:"Title is goes here...",
            url:"/01.jfif",
            love:"25"
        },{
            title:"Title is goes here...",
            url:"/02.jfif",
            love:"31"
        },{
            title:"Title is goes here...",
            url:"/03.jfif",
            love:"82"
        },{
            title:"Title is goes here...",
            url:"/04.jfif",
            love:"64"
        },{
            title:"Title is goes here...",
            url:"/05.jfif",
            love:"45"
        },{
            title:"Title is goes here...",
            url:"/06.jfif",
            love:"11"
        },{
            title:"Title is goes here...",
            url:"/07.jfif",
            love:"12"
        },{
            title:"Title is goes here...",
            url:"/08.jfif",
            love:"25"
        },{
            title:"Title is goes here...",
            url:"/09.jfif",
            love:"25"
        },{
            title:"Title is goes here...",
            url:"/10.jfif",
            love:"25"
        },{
            title:"Title is goes here...",
            url:"/11.jfif",
            love:"25"
        },{
            title:"Title is goes here...",
            url:"/12.jfif",
            love:"25"
        },{
            title:"Title is goes here...",
            url:"/13.jfif",
            love:"25"
        },{
            title:"Title is goes here...",
            url:"/14.jfif",
            love:"25"
        }
    ]



    const [imgFile, setImgFile] = useState(null);

    const loadFile = async ()=>{
        const res = await axios.get("api/fileLoad");
        setImgFile(res.data.file);
    }

    useEffect(() => {
        (async ()=>{
            await loadFile();
        })()
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="grid-container my-2">
                    {
                        imgFile?.map((item, i)=>{
                            return(

                                    <div key={i} className="cards rounded-3 shadow-sm">
                                        <Link to={`/details/${item._id}`}>
                                        <img className="w-100 rounded-top-2" src={`http://localhost:2000/${item.filePath}`} alt={"item.title"} crossOrigin={"anonymous"}/>
                                        <div className="d-flex justify-content-between px-2 mt-2">
                                            <p>title</p>
                                            <p><i className="bi bi-suit-heart"></i> {"item.love"}</p>
                                        </div>
                                        </Link>
                                    </div>

                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ImageGridComponents;