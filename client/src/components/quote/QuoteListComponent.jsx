import React, {useEffect, useRef} from 'react';
import {toPng} from "html-to-image";
import QuoteStore from "../../dashboard/store/QuoteStore.js";
import {Link} from "react-router-dom";

const QuoteListComponent = ({data}) => {

    const {quoteList, getQuoteList}=QuoteStore();
    useEffect(()=>{
        (async ()=>{
            await getQuoteList();
        })()
    },[])

    const cardRef = useRef();
    const downloadImage = () => {
        if (cardRef.current) {
            toPng(cardRef.current, { cacheBust: true })
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = "quote-card.png";
                    link.click();
                })
                .catch((err) => {
                    console.error("Error generating image:", err);
                });
            document.getElementById(data._id).classList.add("d-none");
        }
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className="fs-2 fw-bold text-center mt-3">Quote</h2>
                    <hr/>
                </div>
            </div>
            <div className="row">
                {quoteList && quoteList.length > 0 && quoteList.map((item, index) => {
                    return (
                        <div className="col-12 d-flex flex-wrap" key={index}>
                            <div className="card shadow w-100 my-2" ref={cardRef}>
                                <Link to={"/quote/"+item._id} className="text-black">
                                    <div className="card-body d-flex flex-column justify-content-center">
                                        <h2 className="fs-5 card-title">"{item.quote}"</h2>
                                        <p className="card-text text-end">-{item.author['name']}</p>
                                    </div>
                                </Link>
                                <i id={item._id} className="bi bi-download position-absolute top-0 end-0 me-2 mb-1"
                                   onClick={downloadImage}
                                   style={{cursor: "pointer"}} title="Download"></i>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
};

export default QuoteListComponent;