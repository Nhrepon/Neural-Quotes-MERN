import React, {useEffect, useState} from 'react';

import QuoteStore from "../../dashboard/store/QuoteStore.js";
import {Link} from "react-router-dom";

const QuoteListComponent = ({data}) => {

    const [pageNo, setPageNo] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [status, setStatus] = useState("published");

    const {quoteList, getQuoteList,totalQuote}=QuoteStore();

    useEffect(()=>{
        (async ()=>{
            await getQuoteList(pageNo, perPage, status);
        })()
    },[])

    const reload = () => {
        window.location.redirect("/quote/"+data._id);
    }


    const nextPage = async ()=>{
        await getQuoteList(pageNo+1, perPage, status);
        setPageNo(pageNo+1);
    }
    const prevPage = async ()=>{
        await getQuoteList(pageNo-1, perPage, status);
        setPageNo(pageNo-1);
    }


    return (
        <div className="container my-5">
            <div className="row">
                <div className="d-flex flex-row justify-content-between align-items-center my-2">
                    <h2 className="fs-4 fw-bold">Quote list</h2>
                    <div className="d-flex flex-row gap-3 justify-content-center align-items-center">
                        <button onClick={prevPage} disabled={pageNo === 1} className="btn btn-success">Prev</button>
                        <span className="fs-5">{pageNo}</span>
                        <button onClick={nextPage} disabled={pageNo === Math.ceil(totalQuote / perPage)}
                                className="btn btn-success">Next
                        </button>
                    </div>
                </div>
                <hr/>
                {quoteList && quoteList.length > 0 && quoteList.map((item, index) => {
                    return (
                        <div className="col-sm-6 d-flex flex-wrap justify-content-center" key={index}>
                            <div className="card shadow w-100 my-3">
                                <Link onClick={reload} to={"/quote/" + item._id} className="text-black">
                                    <div className="card-body d-flex flex-column justify-content-center">
                                        <h5 className="card-title">"{item.quote}"</h5>
                                        <p className="card-text text-end">-{item.author['name']}</p>
                                    </div>
                                </Link>
                                <div className="card-footer d-flex justify-content-end gap-3">
                                    <i className="bi bi-hand-thumbs-up"> {item.meta["likes"]}</i>
                                    <i className="bi bi-eye"> {item.meta["views"]}</i>
                                    <i className="bi bi-share"> {item.meta["sharedCount"]}</i>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
};

export default QuoteListComponent;