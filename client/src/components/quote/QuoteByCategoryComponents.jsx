import React, {useEffect, useState} from 'react';
import {backendUrl} from "../../../config.js";
import {Link} from "react-router-dom";
import DataStore from "../../store/DataStore.js";

const QuoteByCategoryComponents = () => {

    const {categoryListWithQuotes,
        getCategoryWithQuotes,
        quoteListByCategory,
        getQuoteListByCategory,
        total,
        categoryId}=DataStore();

    const [pageNo, setPageNo]=useState(1);
    const [perPage, setPerPage]=useState(4);
    const [cateId, setCateId]=useState();

    useEffect(()=>{
        (async ()=>{
            await getCategoryWithQuotes(pageNo, 100);
        })()
    },[]);


    useEffect(()=>{
        (async ()=>{
            if(categoryId){
                await getQuoteListByCategory(categoryId, pageNo, perPage);
                setCateId(categoryId);
            }
        })()
    },[categoryId]);


    const nextPage = async ()=>{
        setPageNo(pageNo+1);
        await getQuoteListByCategory(cateId, pageNo, perPage);
    }
    const prevPage = async ()=>{
        setPageNo(pageNo-1);
        await getQuoteListByCategory(cateId, pageNo, perPage);
    }

    const categoryOnclick = async (id)=>{
        setPageNo(1);
        setPerPage(4)
        setCateId(id)
        await getQuoteListByCategory(id, pageNo, 4);
    }

    const handleOnChange = async (event) => {
        const selectedPerPage = parseInt(event.target.value);
        setPerPage(selectedPerPage);
        setPageNo(1);
        await getQuoteListByCategory(cateId, pageNo, selectedPerPage);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="container my-5">
                    <div className="row">
                        <h2 className="fs-4 fw-bold">Quotes By Category</h2>
                        <hr/>
                        <div className="col-sm-3">
                            <ul className="list-unstyled">
                                {
                                    categoryListWithQuotes && categoryListWithQuotes.map((item, index) => {
                                        return (
                                            <li key={index} onClick={()=>categoryOnclick(item._id)}
                                                style={{cursor: "pointer"}} className="nav-item d-flex flex-row justify-content-between">
                                                <p>{item.categoryName}</p> <span>{item.quoteCount}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                        </div>
                        <div className="col-sm-9">
                            <div className="ms-3 d-flex flex-row gap-3 align-items-center justify-content-between">
                                <div>
                                    Quotes for:{" "}<span
                                    className="fw-bold">{categoryListWithQuotes.find(item => item._id === cateId)?.categoryName || "loading..."}</span>
                                </div>
                                <div className="form-group">
                                    <select onChange={(e) => handleOnChange(e)} value={perPage.toString()}
                                            className="form-select form-control">
                                        <option value="4">4 per page</option>
                                        <option value="6">6 per page</option>
                                        <option value="8">8 per page</option>
                                        <option value="10">10 per page</option>
                                    </select>
                                </div>
                                <div className="d-flex flex-row gap-3 align-items-center">
                                    <button onClick={prevPage} disabled={pageNo === 1}
                                            className="btn btn-success">Prev
                                    </button>
                                    <span className="fs-5">{pageNo}</span>
                                    <button onClick={nextPage} disabled={pageNo === Math.ceil(total / perPage)}
                                            className="btn btn-success">Next
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap">
                                {
                                    quoteListByCategory && quoteListByCategory.map((item, index) => {
                                        return (
                                            <div key={index} className="col-sm-6">
                                                <Link className="nav-link" to={`/quote/${item._id}`}>
                                                <div className="card rounded-0 shadow-sm my-2 ms-3 me-0" key={index}>
                                                    <img src={backendUrl + item.image}
                                                         alt={item.categoryName}
                                                         crossOrigin={"anonymous"}
                                                         className="card-img rounded-0"
                                                         style={{
                                                             aspectRatio: "16/9",
                                                             objectFit: "cover",
                                                             filter: "brightness(0.3)"
                                                         }}/>
                                                    <div className="fs-5 top-50 start-50 translate-middle card-title text-center position-absolute text-light"
                                                         style={{overflow: "hidden", display: "-webkit-box", WebkitLineClamp: "4", WebkitBoxOrient: "vertical"}}>
                                                        <p>{item.quote}</p>
                                                    </div>
                                                </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuoteByCategoryComponents;