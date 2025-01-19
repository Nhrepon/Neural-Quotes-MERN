import React from 'react';
import AuthorStore from "../../store/AuthorStore.js";
import toast from "react-hot-toast";

import {modalHide} from "../../../utility/Utility.js";
import MediaPicker from "../media/MediaPicker.jsx";

const CreateAuthorComponent = () => {
    const {authorFormOnChange, authorForm, createAuthor, getAuthorList} = AuthorStore();

    const onSubmit = async ()=>{
        if (authorForm.name === ""){
            toast.error("Author name is required!");
        }else{
            const res = await createAuthor(authorForm);
            if (res.status === "success"){
                toast.success("Category successfully.");
                await getAuthorList();
                await modalHide("create");
                authorForm.name = "";
                authorForm.bio = "";
                authorForm.profilePicture = "";
                authorForm.nationality = "";

            }else if(res.status === "duplicate"){
                toast.error(res.message);
            }else {
                toast.error(res.message);
            }
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#create">New
                    </button>

                    <div className="modal fade" id="create" data-bs-backdrop="static" data-bs-keyboard="false"
                         tabIndex="-1"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add new Category</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body d-flex flex-column gap-3">
                                    <div className="form-group">
                                        <label htmlFor="Name">Name</label>
                                        <input value={authorForm.name} onChange={(e) => {
                                            authorFormOnChange("name", e.target.value)
                                        }} type="text" name="name" id="name"
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="bio">Bio</label>
                                        <textarea value={authorForm.bio} onChange={(e) => {
                                            authorFormOnChange("bio", e.target.value)
                                        }}  name="bio" id="bio"
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="profilePicture">Profile Picture</label>
                                        <MediaPicker onInputChange={(filePath)=>{authorFormOnChange("profilePicture", filePath)}}/>
                                        <input value={authorForm.profilePicture} onChange={(e) => {
                                            authorFormOnChange("profilePicture", e.target.value)
                                        }} type="text" name="profilePicture" id="profilePicture"
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nationality">Nationality</label>
                                        <input value={authorForm.nationality} onChange={(e) => {
                                            authorFormOnChange("nationality", e.target.value)
                                        }} type="text" name="nationality" id="nationality"
                                               className="form-control"/>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            data-bs-dismiss="modal">Close
                                    </button>
                                    <button onClick={onSubmit} type="button" className="btn btn-primary">Save changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateAuthorComponent;