import React, {useEffect, useState} from 'react';
import CategoryStore from "../../store/CategoryStore.js";
import toast from "react-hot-toast";
import {DeleteAlert, modalHide} from "../../../utility/Utility.js";
import {Modal} from "bootstrap";
import MediaPicker from "../media/MediaPicker.jsx";


const CategoryListComponents = () => {
    const [id, setId]=useState();
    const {createCategory, categoryForm, categoryFormOnChange, getCategoryList, categoryList,deleteCategory, updateCategory}=CategoryStore();

    useEffect(()=>{
        (async ()=>{
            await getCategoryList();
        })()
    },[])


    const onSubmit = async ()=>{
        if(categoryForm.categoryName === ""){
            toast.error("Category name is required");
        }else{
            const res = await createCategory(categoryForm);
            if(res.status === "success"){
                await getCategoryList();
                toast.success("Category successfully.");
                await modalHide("create");
            }else if(res.status === "duplicate"){
                toast.error("Category name already exists!");
            }else {
                toast.error("failed");
            }
        }
    }

    const onUpdate = async ()=>{
        const res = await updateCategory(id, categoryForm);
        if(res.status === "success"){
            await getCategoryList();
            toast.success("Category updated successfully.");
            await modalHide("update");

        }else if(res.status === "duplicate"){
            toast.error("Category name already exists!");
        }else {
            toast.error("failed");
        }
    }

    const updateItem = async (item)=>{
        categoryFormOnChange("categoryName", item.categoryName);
        categoryFormOnChange("categoryDesc", item.categoryDesc);
        categoryFormOnChange("categoryImg", item.categoryImg);
        setId(item._id);
    }
    const deleteItem = async (id)=>{
        if(await DeleteAlert()){
            const res = await deleteCategory(id);
            if(res){
                await getCategoryList();
                toast.success("Category deleted successfully!");
            }else {
                toast.error("Category deleted failed!");
            }

        }

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <MediaPicker/>
                    <div className="new">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#create">New</button>

                        <div className="modal fade" id="create" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Add new Category</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label htmlFor="categoryName">Category Name</label>
                                            <input value={categoryForm.categoryName} onChange={(e)=>{categoryFormOnChange("categoryName", e.target.value)}} type="text" name="categoryName" id="categoryName"
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="CategoryDesc">Category Description</label>
                                            <input value={categoryForm.categoryDesc} onChange={(e)=>{categoryFormOnChange("categoryDesc", e.target.value)}} type="text" name="CategoryDesc" id="CategoryDesc"
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="CategoryImg">Category Image</label>
                                            <input value={categoryForm.categoryImg} onChange={(e)=>{categoryFormOnChange("categoryImg", e.target.value)}} type="text" name="CategoryImg" id="CategoryImg" className="form-control"/>
                                        </div>
                                        <MediaPicker/>
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
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Created By</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            categoryList && categoryList?.map((item, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.categoryName}</td>
                                    <td>{item.categoryDesc}</td>
                                    <td><img src={item.categoryImg} alt={item.categoryName} width={80} crossOrigin={"anonymous"}/></td>
                                    <td>{item.user["userName"]}</td>
                                    <td>
                                        {
                                            new Date(item.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: '2-digit'
                                            }).replace(/\s/g, '-')
                                        }
                                    </td>
                                    <td>
                                        {
                                            new Date(item.updatedAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: '2-digit'
                                            }).replace(/\s/g, '-')
                                        }
                                    </td>
                                    <td>
                                        <div className={"d-flex text-center"}>
                                            <button onClick={()=>updateItem(item)} className="btn text-primary border-0" data-bs-toggle="modal" data-bs-target="#update">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <div className="modal fade text-start" id="update" data-bs-backdrop="static"
                                                 data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Add new
                                                                Category</h5>
                                                            <button type="button" className="btn-close"
                                                                    data-bs-dismiss="modal"
                                                                    aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="form-group">
                                                                <label htmlFor="categoryName">Category Name</label>
                                                                <input value={categoryForm.categoryName}
                                                                       onChange={(e) => {
                                                                           categoryFormOnChange("categoryName", e.target.value)
                                                                       }} type="text" name="categoryName"
                                                                       id="categoryName"
                                                                       className="form-control"/>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="CategoryDesc">Category
                                                                    Description</label>
                                                                <input value={categoryForm.categoryDesc}
                                                                       onChange={(e) => {
                                                                           categoryFormOnChange("categoryDesc", e.target.value)
                                                                       }} type="text" name="CategoryDesc"
                                                                       id="CategoryDesc"
                                                                       className="form-control"/>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="CategoryImg">Category Image</label>
                                                                <input value={categoryForm.categoryImg}
                                                                       onChange={(e) => {
                                                                           categoryFormOnChange("categoryImg", e.target.value)
                                                                       }} type="text" name="CategoryImg"
                                                                       id="CategoryImg" className="form-control"/>
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

                                            <button onClick={async () => {
                                                await deleteItem(item["_id"])
                                            }} className="btn text-danger border-0">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CategoryListComponents;