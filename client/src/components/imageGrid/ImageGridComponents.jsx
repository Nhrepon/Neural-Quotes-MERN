import React from 'react';
import './style.css';

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


    return (
        <div className="container">
            <div className="row">
                <div className="grid-container my-2">
                    {
                        data.map((item, i)=>{
                            return(
                                <>
                                    <div className="cards rounded-3 shadow-sm">
                                        <img className="w-100 rounded-top-2" src={item.url} alt={item.title}/>
                                        <div className="d-flex justify-content-between px-2 mt-2">
                                            <p>{item.title}</p>
                                            <p><i className="bi bi-suit-heart"></i> {item.love}</p>
                                        </div>
                                    </div>
                                </>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ImageGridComponents;