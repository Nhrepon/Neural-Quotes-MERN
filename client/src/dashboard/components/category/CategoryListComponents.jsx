import React, {useEffect, useState} from 'react';
import CategoryStore from "../../store/CategoryStore.js";
import toast from "react-hot-toast";
import {DeleteAlertWithData} from "../../../utility/Utility.js";
import {backendUrl} from "../../../../config.js";
import UpdateCategoryComponent from "./UpdateCategoryComponent.jsx";
import CreateCategoryComponent from "./CreateCategoryComponent.jsx";
import ReactPaginate from "react-paginate";


const CategoryListComponents = () => {

    const {getCategoryList, totalCategory, categoryList, deleteCategory} = CategoryStore();

    let [perPage, setPerPage] = useState(5);
    let [search, setSearch] = useState(0);

    useEffect(() => {
        (async () => {
            await getCategoryList(1, perPage, search);
        })()
    }, [perPage, search]);

    const handleOnChange = async (event) => {
        const selectedPerPage = parseInt(event.target.value);
        setPerPage(selectedPerPage);
        await getCategoryList(1, selectedPerPage, search);
    };

    const handlePageClick = async (event) => {
        await getCategoryList(event.selected + 1, perPage, search);
    };


    const deleteItem = async (item) => {
        if (await DeleteAlertWithData(item._id, item.categoryName)) {
            const res = await deleteCategory(item._id);
            if (res.status === "success") {
                await getCategoryList();
                toast.success("Category deleted successfully!");
            } else {
                toast.error(res.message);
            }

        }

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-center position-relative mt-3">
                    <h2>Categories</h2>
                    <div className="position-absolute start-0 ms-2 ">
                        <CreateCategoryComponent/>
                    </div>
                    <div className="end-0 position-absolute">
                        <div className="form-group">
                            <select onChange={handleOnChange} value={perPage.toString()} className="form-select form-control">
                                <option value="5">5 per page</option>
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
            <div className="row my-5">
                <div className="col-12 d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ReactPaginate
                            previousLabel="<"
                            nextLabel=">"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={totalCategory / perPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default CategoryListComponents;