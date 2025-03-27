import React, {useEffect, useState} from 'react';
import CreateAuthorComponent from "./CreateAuthorComponent.jsx";
import AuthorStore from "../../store/AuthorStore.js";
import UpdateAuthorComponent from "./UpdateAuthorComponent.jsx";
import {DeleteAlert, truncateText} from "../../../utility/Utility.js";
import toast from "react-hot-toast";
import {backendUrl} from "../../../../config.js";

const AuthorListComponents = () => {

    const {authorList, getAuthorList, totalAuthor,deleteAuthor}=AuthorStore();
    const [pageNo, setPageNo] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const totalPage = Math.ceil(totalAuthor/perPage);

    useEffect(()=>{
        (async ()=>{
            await getAuthorList(pageNo, perPage, true);
        })()
    }, []);

    const deleteItem = async (id)=>{
        if(await DeleteAlert()){
            const res = await deleteAuthor(id);
            if(res.status === "success"){
                await getAuthorList();
                toast.success("Author deleted successfully!");
            }else {
                toast.error(res.message);
            }

        }

    }

    const handleOnChange = async (event) => {
        const selectedPerPage = parseInt(event.target.value);
        setPerPage(selectedPerPage);
        await getAuthorList(1, selectedPerPage);
        setPageNo(1);
    };

    const nextPage = async ()=>{
        setPageNo(pageNo+1);
        await getAuthorList(pageNo, perPage);
    }
    const previousPage = async ()=>{
        setPageNo(pageNo-1);
        await getAuthorList(pageNo, perPage);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex flex-row align-items-center justify-content-between gap-3 mt-3">
                    <div className="">
                        <CreateAuthorComponent/>
                    </div>
                    <h2>Author</h2>
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="d-flex flex-row gap-3 align-items-center">
                            <button onClick={previousPage} disabled={pageNo === 1}
                                    className="btn btn-success">Prev
                            </button>
                            <span className="fs-5">{pageNo}</span>
                            <button onClick={nextPage} disabled={pageNo === Math.ceil(totalAuthor / perPage)}
                                    className="btn btn-success">Next
                            </button>
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

            </div>
            <hr/>
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
                                        <td>{i+1+(pageNo*perPage)-perPage}</td>
                                        <td>{item.name}</td>
                                        <td>{truncateText(item.bio, 50)}</td>
                                        <td>{item.nationality}</td>
                                        <td>
                                            <img src={backendUrl+item.profilePicture} alt={item.name} width={120} height={90} crossOrigin={"anonymous"}/>
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