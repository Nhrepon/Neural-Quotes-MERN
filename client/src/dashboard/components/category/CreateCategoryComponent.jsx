import React, {useEffect} from 'react';
import MediaPicker from "../media/MediaPicker.jsx";
import {backendUrl} from "../../../../config.js";
import toast from "react-hot-toast";
import {modalHide} from "../../../utility/Utility.js";
import CategoryStore from "../../store/CategoryStore.js";

const CreateCategoryComponent = () => {

    const {createCategory, categoryForm, categoryFormOnChange, getCategoryList, categoryList}=CategoryStore();

    useEffect(()=>{
        (async ()=>{
            categoryList === null && await getCategoryList(1, 1000, 0);
        })()
    },[])

    const onSubmit = async ()=>{
        if(categoryForm.categoryName === ""){
            toast.error("Category name is required");
        }else{
            const res = await createCategory(categoryForm);
            if(res.status === "success"){
                categoryForm.categoryName = "";
                categoryForm.categoryDesc = "";
                categoryForm.categoryImg = "";
                await modalHide("create");
                await getCategoryList(1, 1000, 0);
                toast.success("Category successfully.");
            }else if(res.status === "duplicate"){
                toast.error("Category name already exists!");
            }else {
                toast.error(res.message);
            }
        }
    }

    return (
        <div className="new">
            <button title="Add new item" type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#create">
                <i className="bi bi-plus"></i>
            </button>
            <div className="modal fade" id="create" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add new Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column gap-2">
                            <div className="form-group">
                                <label htmlFor="categoryName">Category Name</label>
                                <input value={categoryForm.categoryName} onChange={(e) => {
                                    categoryFormOnChange("categoryName", e.target.value)
                                }} type="text" name="categoryName" id="categoryName"
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="CategoryDesc">Category Description</label>
                                <input value={categoryForm.categoryDesc} onChange={(e) => {
                                    categoryFormOnChange("categoryDesc", e.target.value)
                                }} type="text" name="CategoryDesc" id="CategoryDesc"
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoryImg">Category Image</label>
                                <input value={categoryForm.categoryImg} onChange={(e) => {
                                    categoryFormOnChange("categoryImg", e.target.value)
                                }} type="text" name="categoryImg" id="categoryImg"
                                       className="form-control"/>
                                <MediaPicker
                                    onInputChange={(filePath) => categoryFormOnChange("categoryImg", filePath)}/>
                                <div className="d-flex justify-content-center align-items-center">
                                    <img className="rounded" src={backendUrl + categoryForm.categoryImg} alt=""
                                         crossOrigin={"anonymous"} width={80}/>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-bs-dismiss="modal">Close
                            </button>
                            <button onClick={onSubmit} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCategoryComponent;