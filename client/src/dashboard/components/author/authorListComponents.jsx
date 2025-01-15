import React, {useEffect} from 'react';
import CreateAuthorComponent from "./CreateAuthorComponent.jsx";
import AuthorStore from "../../store/AuthorStore.js";
import UpdateAuthorComponent from "./UpdateAuthorComponent.jsx";
import {DeleteAlert} from "../../../utility/Utility.js";
import toast from "react-hot-toast";

const AuthorListComponents = () => {

    const {authorList, getAuthorList, deleteAuthor}=AuthorStore();
    useEffect(()=>{
        (async ()=>{
            await getAuthorList();
        })()
    }, [])

    const deleteItem = async (id)=>{
        if(await DeleteAlert()){
            const res = await deleteAuthor(id);
            if(res){
                await getAuthorList();
                toast.success("Author deleted successfully!");
            }else {
                toast.error("Author deleted failed!");
            }

        }

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-between align-items-center">
                    <h2>Author</h2>
                    <div>
                        <CreateAuthorComponent/>
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
                            <th>Bio</th>
                            <th>Nationality</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            authorList && authorList.map((item, i)=>{
                                return (
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.bio}</td>
                                        <td>{item.nationality}</td>
                                        <td>
                                            <img src={item.profilePicture} alt={item.name} width={80} crossOrigin={"anonymous"}/>
                                        </td>
                                        <td>
                                            <div className={"d-flex text-center"}>
                                                <UpdateAuthorComponent data={item}/>

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

export default AuthorListComponents;