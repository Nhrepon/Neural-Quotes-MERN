import React, {useEffect, useState} from 'react';
import CategoryStore from "../../store/CategoryStore.js";
import AuthorStore from "../../store/AuthorStore.js";
import QuoteStore from "../../store/QuoteStore.js";
import toast from "react-hot-toast";
import {DeleteAlert, isAdmin, truncateText} from "../../../utility/Utility.js";
import UpdateQuoteComponent from "./UpdateQuoteComponent.jsx";
import CreateAuthorComponent from "../author/CreateAuthorComponent.jsx";
import CreateCategoryComponent from "../category/CreateCategoryComponent.jsx";
import NoDataFoundComponent from "../../../components/notFound/NoDataFoundComponent.jsx";

const QuoteListComponents = () => {
    const {getCategoryList, categoryList} = CategoryStore();
    const {getAuthorList, authorList} = AuthorStore();
    const {quoteFormOnChange, quoteForm, createQuote, quoteList, getQuoteList, deleteQuote, updateQuote} = QuoteStore();

    const [pageNo, setPageNo] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [status, setStatus] = useState("published");
    const [filter, setFilter] = useState("DESC");

    const statusData = [
        {text:"Published", value:"published"},
        {text:"Pending", value:"pending"},
        {text:"Draft", value:"draft"},
        {text:"Cancel", value:"cancel"},
    ]

    useEffect(() => {
        (async () => {
            categoryList === null && await getCategoryList(1, 1000, 0);
        })()
    }, [0]);

    useEffect(() => {
        (async () => {
            authorList === null &&  await getAuthorList(1, 10000, true);
        })()
    }, [0]);

    useEffect(() => {
        (async () => {
            await getQuoteList(pageNo, perPage, status, filter);
        })()
    }, []);


    const onSubmit = async () => {
        if (quoteForm.quote === "") {
            toast.error("Quote is required!");
        } else if (quoteForm.categoryId === "") {
            toast.error("Category is required! Please, Select a category.");
        } else if (quoteForm.authorId === "") {
            toast.error("Author is required! Please, Select an author.");
        } else {
            const res = await createQuote(quoteForm);
            if (res.status === "success") {
                await getQuoteList(pageNo, perPage, status,filter);
                toast.success("Quote created successfully.");
                quoteForm.quote = "";
                quoteForm.categoryId = "";
                quoteForm.authorId = "";
                document.getElementById("quote").value = "";
                document.getElementById("category").value = "";
                document.getElementById("author").value = "";
                document.getElementById("status").value = "";

            } else if (res.status === "duplicate") {
                toast.error(res.message);
            } else {
                toast.error("failed");
            }
        }
    }


    const deleteItem = async (id) => {
        if (await DeleteAlert()) {
            const res = await deleteQuote(id);
            if (res.status === "success") {
                await getQuoteList(pageNo, perPage, status);
                toast.success("Quote deleted successfully!");
            } else {
                toast.error(res.message);
            }

        }

    }

    const handleOnChange = async (event) => {
        const selectedPerPage = parseInt(event.target.value);
        setPerPage(selectedPerPage);
        await getQuoteList(1, selectedPerPage, status,filter);
    };

    const handleFilter = async (event) => {
        setFilter(event.target.value);
        await getQuoteList(1, perPage, status, event.target.value);
    };


    return (
        <div className={"container"}>
            <div className="row">
                <div className="col-12 mt-3">
                    <h2 className="text-center">Quotes</h2>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card p-3 d-flex flex-column gap-2 shadow">
                        <div>
                            <h3 className="fs-4">Add new quote</h3>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quote">Quote</label>
                            <textarea value={quoteForm.quote} onChange={(e) => {
                                quoteFormOnChange("quote", e.target.value)
                            }} name="quote" id="quote" className="form-control" rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <div className="d-flex">
                                <select id="category" value={quoteForm.categoryId} onChange={(e) => {
                                    quoteFormOnChange("categoryId", e.target.value)
                                }} className="form-select" aria-label="Default select">
                                    <option selected>Select category</option>
                                    {
                                        categoryList && categoryList.map((item, i) => {
                                            return (
                                                <option key={i} value={item._id}>{item.categoryName}</option>
                                            )
                                        })
                                    }
                                </select>
                                <span className="ms-2">
                                    <CreateCategoryComponent/>
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <div className="d-flex">
                                <select id="author" value={quoteForm.authorId} onChange={(e) => {
                                    quoteFormOnChange("authorId", e.target.value)
                                }} className="form-select" aria-label="Default select">
                                    <option selected>Select author</option>
                                    {
                                        authorList && authorList.map((item, i) => {
                                            return (
                                                <option key={i} value={item._id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <span className="ms-2">
                                    <CreateAuthorComponent/>
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select id="status" value={quoteForm.status} onChange={(e) => {
                                quoteFormOnChange("status", e.target.value)
                            }} className="form-select" aria-label="Default select">
                                <option value="pending">Pending for review</option>
                                <option value="draft">Draft</option>
                                {
                                    isAdmin() &&
                                    <>
                                        <option value="cancel">Cancel</option>
                                        <option value="published">Published</option>
                                    </>
                                }
                            </select>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success">Add</button>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="shadow d-flex flex-row justify-content-between">
                        <div className="">
                            {
                                statusData && statusData.map((item, i) => {
                                    return (
                                        <button key={i} value={item.value} onClick={async () => {
                                            await getQuoteList(pageNo, perPage, item.value,filter);
                                            setStatus(item.value);
                                        }}
                                                className={item.value === "cancel" ? "btn btn-danger rounded-0" : "btn btn-success rounded-0"}>{item.text}</button>
                                    )
                                })
                            }
                        </div>
                        <div className="d-flex flex-row gap-2">
                            <div className="form-group">
                                <select id="filter" onChange={(e) => handleFilter(e)} value={filter}
                                        className="form-select form-control">
                                    <option value="ASC">Ascending</option>
                                    <option value="DESC">Descending</option>

                                </select>
                            </div>
                            <div className="form-group">
                                <select onChange={(e) => handleOnChange(e)} value={perPage.toString()}
                                        className="form-select form-control">
                                    <option value="10">10 per page</option>
                                    <option value="25">25 per page</option>
                                    <option value="50">50 per page</option>
                                    <option value="100">100 per page</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    {
                        quoteList == null ? <NoDataFoundComponent/> :
                            <table className={"table table-striped"}>
                                <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Quote</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th>Status</th>
                                    <th>User</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {

                                    quoteList && quoteList.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{truncateText(item.quote, 40)}</td>
                                                <td>{item.category["categoryName"]}</td>
                                                <td>{truncateText(item.author["name"], 20)}</td>
                                                <td>{item.status}</td>
                                                <td>{truncateText(item.user["userName"], 10)}</td>
                                                <td>
                                                    <div className={"d-flex text-center"}>
                                                        <UpdateQuoteComponent data={item} filter={filter}/>
                                                        {/*<button className="btn text-success border-0">*/}
                                                        {/*    <i className="bi bi-pencil-fill"></i>*/}
                                                        {/*</button>*/}

                                                        <button onClick={async () => {
                                                            await deleteItem(item["_id"])
                                                        }} className="btn text-danger border-0">
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                                </tbody>
                            </table>
                    }
                </div>
            </div>
        </div>
    );
};

export default QuoteListComponents;