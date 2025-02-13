import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router";
import {backendUrl} from "../../../config.js";
import {toPng} from "html-to-image";
import toast from "react-hot-toast";
import QuoteListComponent from "./QuoteListComponent.jsx";
import QuoteStore from "../../dashboard/store/QuoteStore.js";

const SingleQuote = () => {
    const {singleQuote, getSingleQuote, quoteMeta} = QuoteStore();

    const {id} = useParams();

    useEffect(()=>{
        (async ()=>{
            await getSingleQuote(id);
        })()
    },[id]);

    const quote = singleQuote?.data[0];
    const img = singleQuote?.image[0];
    // console.log(singleQuote?.status);
    // console.log(singleQuote?.data[0]);
    // console.log(singleQuote?.image[0]);

    const cardRef = useRef();
    const downloadImage = async () => {
        if (cardRef.current) {
            try{
                const dataUrl = await toPng(cardRef.current, {
                    cacheBust: true,
                    scale: 1
                });

                const filename = quote.quote
                    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove invalid characters
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
                    .trim() + '-neural-quotes.png';

                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = filename;
                link.click();
                toast.success("Quote image downloaded successfully!");

            }catch (e) {
                toast.error(e.message);
            }
        }
    };

    const like = async () => {
        const res = await quoteMeta(id, 0, 1);
        if (res.status === "success") {
            toast.success("Quote liked successfully!");
        } else {
            toast.error(res.message);
        }
    };
    const share = async () => {
        const res = await quoteMeta(id, 1, 0);
        if (res.status === "success") {
            toast.success("Quote shared successfully!");
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="container">
<div className="row justify-content-center my-2">
    <div className="col-sm-3">
        {
            quote != null && (
                <div className="card shadow position-relative" ref={cardRef}>
                    <img className="card-img rounded" src={backendUrl+img.filePath} alt={quote.quote} crossOrigin={"anonymous"}/>
                    <div className="card-body rounded d-flex align-items-center justify-content-center position-absolute text-center w-100 h-100"
                        style={{backgroundColor: "rgba(0,0,0,0.7)"}}>
                        <div>
                            <span className="d-flex">
                                <svg fill="#fff" width="40px" height="40px" viewBox="0 0 32 32" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 0-1.156 0.844-2.875 3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 0-1.156 0.875-2.875 3.875-5.344z"></path>
                            </svg>
                            </span>
                            <p className="card-text text-light text-center mx-2 text-wrap" >{quote.quote}</p>
                            <span className="d-flex justify-content-end">
                                <svg style={{transform: "rotate(180deg)"}} fill="#fff" width="40px" height="40px" viewBox="0 0 32 32" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 0-1.156 0.844-2.875 3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 0-1.156 0.875-2.875 3.875-5.344z"></path>
                            </svg>
                            </span>
                            <p className="text-end text-light fs-6">- {quote.author.name}</p>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
    <div className="col-sm-3">
        {
            quote != null && (
                <div className="d-flex flex-column gap-3 mt-3">
                    <div>
                        <i onClick={like} className="bi bi-hand-thumbs-up"> {quote.meta.likes}</i>
                    </div>
                    <div>
                        <i className="bi bi-eye"> {quote.meta.views}</i>
                    </div>
                    <div>
                        <i onClick={share} className="bi bi-share"> {quote.meta.sharedCount}</i>
                    </div>
                    <div>
                        <i className="bi bi-download"
                           onClick={downloadImage}
                           style={{cursor: "pointer"}} title="Download"></i>
                    </div>
                </div>
            )
        }


    </div>
    <div className="col-sm-6">
        <QuoteListComponent/>
    </div>
</div>
        </div>
    );
};

export default SingleQuote;