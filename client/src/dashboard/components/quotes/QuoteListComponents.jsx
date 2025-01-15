import React, {useEffect} from 'react';
import CategoryStore from "../../store/CategoryStore.js";
import AuthorStore from "../../store/AuthorStore.js";
import QuoteStore from "../../store/QuoteStore.js";
import toast from "react-hot-toast";
import {DeleteAlert, modalHide} from "../../../utility/Utility.js";
import UpdateQuoteComponent from "./UpdateQuoteComponent.jsx";

const QuoteListComponents = () => {
    const {getCategoryList, categoryList}=CategoryStore();
    const {getAuthorList, authorList}=AuthorStore();
    const {quoteFormOnChange, quoteForm, createQuote, quoteList, getQuoteList, deleteQuote, updateQuote}=QuoteStore();


    useEffect(()=>{
        (async ()=>{
            await getCategoryList();
            await getAuthorList();
            await getQuoteList();
        })()
    },[])


    const onSubmit = async ()=>{
        if (quoteForm.quote === ""){
            toast.error("Quote is required!");
        }else if (quoteForm.categoryId === ""){
            toast.error("Category is required! Please, Select a category.");
        }else if (quoteForm.authorId === ""){
            toast.error("Author is required! Please, Select an author.");
        }else{
            const res = await createQuote(quoteForm);
            if (res.status === "success"){
                await getQuoteList();
                toast.success("Quote created successfully.");
            }else if(res.status === "duplicate"){
                toast.error(res.message);
            }else {
                toast.error("failed");
            }
        }
    }


    const deleteItem = async (id)=>{
        if(await DeleteAlert()){
            const res = await deleteQuote(id);
            if(res){
                await getQuoteList();
                toast.success("Quote deleted successfully!");
            }else {
                toast.error("Quote deleted failed!");
            }

        }

    }




    return (
        <div className={"container"}>
            <div className="row">
                <div className="col-12">
                    <h2>Quote list</h2>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card p-3 d-flex flex-column gap-2 shadow">
                        <div>
                            <h3>Add new quote</h3>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quote">Quote</label>
                            <input value={quoteForm.quote} onChange={(e)=>{quoteFormOnChange("quote", e.target.value)}} type="text" name="quote" id="quote" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select value={quoteForm.categoryId} onChange={(e)=>{quoteFormOnChange("categoryId", e.target.value)}} className="form-select" aria-label="Default select">
                                <option selected>Select category</option>
                                {
                                    categoryList && categoryList.map((item, i)=>{
                                        return (
                                            <option key={i} value={item._id}>{item.categoryName}</option>
                                    )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <select value={quoteForm.authorId} onChange={(e)=>{quoteFormOnChange("authorId", e.target.value)}} className="form-select" aria-label="Default select">
                                <option selected>Select author</option>
                                {
                                    authorList && authorList.map((item, i)=>{
                                        return (
                                            <option key={i} value={item._id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select value={quoteForm.status} onChange={(e) => {
                                quoteFormOnChange("status", e.target.value)
                            }} className="form-select" aria-label="Default select">
                                <option value="pending">Pending for review</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success">Add</button>
                    </div>
                </div>
                <div className="col-sm-8">
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
                            quoteList && quoteList.map((item, i)=>{
                                return (
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{item.quote}</td>
                                        <td>{item.category["categoryName"]}</td>
                                        <td>{item.author["name"]}</td>
                                        <td>{item.status}</td>
                                        <td>{item.user["userName"]}</td>
                                        <td>
                                            <div className={"d-flex text-center"}>
                                                <UpdateQuoteComponent data={item} />
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
                </div>
            </div>
        </div>
    );
};

export default QuoteListComponents;