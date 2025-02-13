import React, {useEffect, useState} from 'react';
import MediaPicker from "../media/MediaPicker.jsx";
import {backendUrl} from "../../../../config.js";
import toast from "react-hot-toast";
import {modalHide} from "../../../utility/Utility.js";
import CategoryStore from "../../store/CategoryStore.js";

const UpdateCategoryComponent = ({data}) => {
    const { categoryList, getCategoryList, updateCategory}=CategoryStore();

    const [form, setForm] = useState({
        categoryName:"",
        categoryDesc:"",
        categoryImg:""
    });

    useEffect(() => {
        (async ()=>{
            if (data) {
                setForm({
                    categoryName: data.categoryName || "",
                    categoryDesc: data.categoryDesc || "",
                    categoryImg: data.categoryImg || "",
                });
            }
        })()
    }, [categoryList]);

    const handleOnChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };




    const onUpdate = async ()=>{
        const res = await updateCategory(data._id, form);
        if(res.status === "success"){
            await modalHide(`update-${data._id}`);
            toast.success("Category updated successfully.");
            await getCategoryList(1, 1000, 0);

        }else if(res.status === "duplicate"){
            toast.error("Category name already exists!");
        }else {
            toast.error(res.message);
            await modalHide(`update-${data._id}`);
        }
    }



    return (
        <div className="new">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target={`#update-${data._id}`}>
                <i className="bi bi-pencil"></i>
            </button>
            <div className="modal fade" id={`update-${data._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column gap-2 text-start">
                            <div className="corm-group">
                                <span >Category Id: {data._id}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoryName">Category Name</label>
                                <input value={form.categoryName} onChange={(e) => {
                                    handleOnChange("categoryName", e.target.value)
                                }} type="text" name="categoryName" id="categoryName"
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="CategoryDesc">Category Description</label>
                                <input value={form.categoryDesc} onChange={(e) => {
                                    handleOnChange("categoryDesc", e.target.value)
                                }} type="text" name="CategoryDesc" id="CategoryDesc"
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoryImg">Category Image</label>
                                <input value={form.categoryImg} onChange={(e) => {
                                    handleOnChange("categoryImg", e.target.value)
                                }} type="text" name="categoryImg" id="categoryImg"
                                       className="form-control"/>
                                <MediaPicker
                                    onInputChange={(filePath) => handleOnChange("categoryImg", filePath)}/>
                                {
                                    form.categoryImg && (
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img className="rounded" src={backendUrl + form.categoryImg} alt=""
                                                 crossOrigin={"anonymous"} width={80}/>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-bs-dismiss="modal">Close
                            </button>
                            <button onClick={onUpdate} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategoryComponent;