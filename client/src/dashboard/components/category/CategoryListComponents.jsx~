import React, {useEffect, useState} from 'react';
import CategoryStore from "../../store/CategoryStore.js";
import toast from "react-hot-toast";
import {DeleteAlert, DeleteAlertWithData, modalHide} from "../../../utility/Utility.js";
import MediaPicker from "../media/MediaPicker.jsx";
import {backendUrl} from "../../../../config.js";
import UpdateCategoryComponent from "./UpdateCategoryComponent.jsx";
import CreateCategoryComponent from "./CreateCategoryComponent.jsx";
import CreateAuthorComponent from "../author/CreateAuthorComponent.jsx";


const CategoryListComponents = () => {

    const {createCategory, categoryForm, categoryFormOnChange, getCategoryList, categoryList,deleteCategory}=CategoryStore();

    useEffect(()=>{
        (async ()=>{
            if (!categoryList){
                await getCategoryList();
            }
        })()
    },[categoryList])



    const deleteItem = async (item)=>{
        if(await DeleteAlertWithData(item._id, item.categoryName)){
            const res = await deleteCategory(item._id);
            if(res.status === "success"){
                await getCategoryList();
                toast.success("Category deleted successfully!");
            }else {
                toast.error(res.message);
            }

        }

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-center position-relative mt-3">
                    <h2>Categories</h2>
                    <div className="position-absolute start-0 ms-2 mt-2">
                        <CreateCategoryComponent/>
                    </div>
                </div>
            </div>
            <hr/>

            {
                categoryList == null || categoryList.length === 0 ?
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center mt-5">No Category Found</h1>
                        </div>
                    </div>
                    :

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
                                    categoryList.map((item, i) => {
                                        return <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item.categoryName}</td>
                                            <td>{item.categoryDesc}</td>
                                            <td><img src={backendUrl + item.categoryImg} alt={item.categoryName}
                                                     width={120} height={90} crossOrigin={"anonymous"}/></td>
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
                                                    <UpdateCategoryComponent data={item}/>

                                                    <button onClick={async () => {
                                                        await deleteItem(item);
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
            }
        </div>
    );
};

export default CategoryListComponents;