import React, {useEffect, useState} from 'react';
import axios from "axios";
import {backendUrl} from "../../../config.js";
import {truncateText} from "../../utility/Utility.js";
import {Link} from "react-router-dom";

const BannerComponents = () => {
    const [bannerQuote, setBannerQuote] = useState([]);
    const [popularQuote, setPopularQuote] = useState([]);

    const getBannerQuote = async () => {
        let response = await axios.get("/api/banner-quote");
        if (response.status === 200 && response.data.status === "success") {
            setBannerQuote(response.data.data);
        }
    }
    const getPopularQuote = async () => {
        let response = await axios.get("/api/popular-quote");
        if (response.status === 200 && response.data.status === "success") {
            setPopularQuote(response.data.data);
        }
    }
    useEffect(() => {
        (async () => {
            await getBannerQuote();
            await getPopularQuote();
        })()
    }, []);
    return (
        <div className="container-fluid my-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div id="banner" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                {
                                    bannerQuote && bannerQuote.map((item, index) => {
                                        return (
                                            <button key={index} type="button" data-bs-target="#banner"
                                                    data-bs-slide-to={index}
                                                    className={index === 0 ? "active" : ""} aria-current="true"></button>
                                        )
                                    })
                                }
                            </div>
                            <div className="carousel-inner">
                                {
                                    bannerQuote && bannerQuote.map((item, index) => {
                                        return (
                                            <div className={index === 0 ? "carousel-item active" : "carousel-item"}
                                                 key={index}>
                                                <img src={backendUrl + item.image}
                                                     style={{
                                                         aspectRatio: "16/9",
                                                         objectFit: "cover",
                                                         filter: "brightness(0.3)"
                                                     }}
                                                     className="d-block w-100" alt={item.quote}
                                                     crossOrigin={"anonymous"}/>
                                                <div className="position-absolute top-50 start-50 translate-middle text-light text-center d-none d-md-block">
                                                    <Link className="nav-link" to={`/quote/${item._id}`}>
                                                        <h3 style={{
                                                            overflow: "hidden",
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: "6",
                                                            WebkitBoxOrient: "vertical"
                                                        }}>{item.quote}</h3>
                                                    </Link>
                                                    <p className="text-end">{"- " + item.author.name}</p>
                                                </div>
                                            </div>
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
                    <div className="col-md-4">
                        <h4>Popular Quotes</h4>
                        <hr/>
                        <ul className="list-group">
                            {
                                popularQuote && popularQuote.map((item, index) => {
                                    return (
                                        <li className="list-group-item" key={index}>
                                            <Link to={`/quote/${item._id}`}
                                                  className="nav-link">{truncateText(item.quote, 80)} </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerComponents;