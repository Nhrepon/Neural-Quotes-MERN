import React, {useEffect, useState} from 'react';
import axios from "axios";
import {backendUrl} from "../../../config.js";
const BannerComponents = () => {
    const [bannerQuote, setBannerQuote] = useState([]);
    const getBannerQuote = async ()=>{
        let response = await axios.get("/api/banner-quote");
        if(response.status === 200 && response.data.status === "success"){
            setBannerQuote(response.data.data);
        }
    }
    useEffect(()=>{
        (async ()=>{
            await getBannerQuote();
        })()
    },[]);
    return (
        <div className="container-fluid my-2">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div id="banner" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                {
                                    bannerQuote && bannerQuote.map((item, index)=>{
                                        return(
                                            <>
                                                <button type="button" data-bs-target="#banner" data-bs-slide-to={index}
                                                        className={index === 0 ? "active" : ""} aria-current="true"></button>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div className="carousel-inner">
                                {
                                    bannerQuote && bannerQuote.map((item, index)=>{
                                        return(
                                            <>
                                                <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={index}>
                                                    <img src={backendUrl+item.image}
                                                         style={{aspectRatio: "16/6", objectFit: "cover", filter: "brightness(0.5)"}}
                                                         className="d-block w-100" alt={item.quote} crossOrigin={"anonymous"}/>
                                                    <div className="carousel-caption d-none d-md-block">
                                                        <h3>{item.quote}</h3>
                                                        <p className="text-end">{"- "+item.author.name}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <button className="carousel-control-prev" type="button"
                                    data-bs-target="#banner" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button"
                                    data-bs-target="#banner" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-12"></div>
                </div>
            </div>
        </div>
    );
};

export default BannerComponents;