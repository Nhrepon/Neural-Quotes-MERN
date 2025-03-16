import React, {useEffect, useState} from 'react';
import axios from "axios";
import {backendUrl} from "../../../config.js";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";

const QuoteByCategoryComponents = () => {

    const [categoryListWithQuotes, setCategoryListWithQuotes] = useState([]);
    const [quoteListByCategory, setQuoteListByCategory] = useState();
    const [pageNo, setPageNo]=useState(1);
    const [perPage, setPerPage]=useState(4);
    const [total, setTotal] = useState();
    let [catId, setCatId] = useState();

    useEffect(()=>{
        (async ()=>{
            await getCategoryWithQuotes();
            await getQuoteByCategory(catId, pageNo, perPage);
        })()
    },[catId]);

    const getCategoryWithQuotes = async ()=>{
        const res = await axios.get("/api/categoryWithQuotes");
        if(res.data.status === "success"){
            await setCategoryListWithQuotes(res.data.data);
            await setCatId(res.data.data[0]?._id);
            // await console.log("Category id is: "+res.data.data[0]?._id);
            // await console.log(catId);
        }
    }
    const getQuoteByCategory = async (id, pageNo, perPage)=>{
        try{
            const res = await axios.get(`/api/quoteByCategory/${id}?pageNo=${pageNo}&perPage=${perPage}`);
            if(res.data.status === "success"){
                setQuoteListByCategory(res.data.data);
                setTotal(res.data.total);
            }
            //toast.success(res.data.message);
        }catch (e) {
            toast.error(e.message);
        }
    }



    const nextPage = async (id)=>{
        setPageNo(pageNo+1);
        await getQuoteByCategory(id, pageNo, perPage);
    }
    const prevPage = async (id)=>{
        setPageNo(pageNo-1);
        await getQuoteByCategory(id, pageNo, perPage);
    }

    const handleOnChange = async (event) => {
        const selectedPerPage = parseInt(event.target.value);
        setPerPage(selectedPerPage);
        await getQuoteByCategory(catId, pageNo, selectedPerPage);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <h2 className="fs-4 fw-bold mt-5">Quotes By Category</h2>
                        <hr/>
                        <div className="col-sm-3">
                            <ul className="list-unstyled">
                                {
                                    categoryListWithQuotes && categoryListWithQuotes.map((item, index) => {
                                        return (
                                            <li key={index} onClick={async () => {
                                                await getQuoteByCategory(item._id, pageNo, perPage);
                                                setCatId(item._id);
                                                setPageNo(1);
                                                setPerPage(4);
                                            }}
                                                style={{cursor: "pointer"}} className="nav-item d-flex flex-row justify-content-between">
                                                <p>{item.categoryName}</p> <span>{item.quoteCount}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                        </div>
                        <div className="col-sm-9">
                            <div className="ms-3 d-flex flex-row gap-3 align-items-center">
                                <div>
                                    Quotes for: <span className="fw-bold">{categoryListWithQuotes && categoryListWithQuotes.find(item => item._id === catId)?.categoryName}</span>
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
                            <div className="d-flex flex-row gap-3 justify-content-center align-items-center">
                                <button onClick={() => prevPage(catId)} disabled={pageNo === 1} className="btn btn-success">Prev</button>
                                <span className="fs-5">{pageNo}</span>
                                <button onClick={() => nextPage(catId)} disabled={pageNo === Math.ceil(total/perPage)} className="btn btn-success">Next</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuoteByCategoryComponents;