import React, {useEffect, useState} from 'react';
import {isAdmin, modalHide} from "../../../utility/Utility.js";
import toast from "react-hot-toast";
import QuoteStore from "../../store/QuoteStore.js";
import CategoryStore from "../../store/CategoryStore.js";
import AuthorStore from "../../store/AuthorStore.js";

const UpdateQuoteComponent = (props) => {
    const {updateQuote, getQuoteList} = QuoteStore();
    const {getCategoryList, categoryList}=CategoryStore();
    const {getAuthorList, authorList}=AuthorStore();

    const [form, setForm] = useState({
        quote: "",
        categoryId: "",
        authorId: "",
        status: "",
    });

    useEffect(() => {
        if (props.data) {
            setForm({
                quote: props.data.quote,
                categoryId: props.data.categoryId,
                authorId: props.data.authorId,
                status: props.data.status,
            });
        }
        (async ()=>{
            categoryList === null || categoryList.length === 0 && await getCategoryList(1, 1000, 0);
            authorList === null || authorList.length === 0 && await getAuthorList(1, 10000, "yes");

        })()
    }, [props.data]);

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };




    const onUpdate =async ()=>{
        const res = await updateQuote(props.data._id, form);
        if (res.status === "success") {
            await modalHide(`update-${props.data._id}`);
            await getQuoteList(1, 10, props.data.status, props.filter, props.author);
            toast.success("Quote updated successfully!");
        } else {
            toast.error(res.message);
            await modalHide(`update-${props.data._id}`);
        }
    }
    return (
        <div>
            <button className="btn text-primary border-0" data-bs-toggle="modal"
                    data-bs-target={`#update-${props.data._id}`}>
                <i className="bi bi-pencil-square"></i>
            </button>
            <div className="modal fade text-start" id={`update-${props.data._id}`} data-bs-backdrop="static"
                 data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update quote</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="quote">Quote</label>
                                <textarea value={form.quote} onChange={(e) => {
                                    handleChange("quote", e.target.value)
                                }} name="quote" id="quote" className="form-control" rows="3"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <select value={form.categoryId} onChange={(e) => {
                                    handleChange("categoryId", e.target.value)
                                }} className="form-select" aria-label="Default select">
                                    {
                                        categoryList && categoryList.map((item, i) => {
                                            return (
                                                <option key={i} value={item._id}>{item.categoryName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Author</label>
                                <select value={form.authorId} onChange={(e) => {
                                    handleChange("authorId", e.target.value)
                                }} className="form-select" aria-label="Default select">
                                    {
                                        authorList && authorList.map((item, i) => {
                                            return (
                                                <option key={i} value={item._id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select value={form.status} onChange={(e) => {
                                    handleChange("status", e.target.value)
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

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-bs-dismiss="modal">Close
                            </button>
                            <button onClick={onUpdate} type="button" className="btn btn-primary">Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateQuoteComponent;