import React, {useEffect, useState} from 'react';
import AuthorStore from "../../store/AuthorStore.js";
import {modalHide} from "../../../utility/Utility.js";
import toast from "react-hot-toast";

const UpdateAuthorComponent = (props) => {
    const {authorForm, authorFormOnChange, updateAuthor, getAuthorList} = AuthorStore();

    const [form, setForm] = useState({
        name: "",
        bio: "",
        profilePicture: "",
        nationality: "",
    });

    useEffect(() => {
        if (props.data) {
            setForm({
                name: props.data.name,
                bio: props.data.bio,
                profilePicture: props.data.profilePicture,
                nationality: props.data.nationality,
            });
        }
    }, [props.data]);

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };




    const onUpdate =async ()=>{
        const res = await updateAuthor(props.data._id, form);
        if (res.status === "success") {
            await getAuthorList();
            toast.success("Author updated successfully!");
            await modalHide(`update-${props.data._id}`)
        } else {
            toast.error("Failed to update author.");
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
                            <h5 className="modal-title" id="exampleModalLabel">Add new Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="Name">Name</label>
                                <input value={form.name} onChange={(e) => {
                                    handleChange("name", e.target.value)
                                }} type="text" name="name" id="name"
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Bio</label>
                                <input value={form.bio} onChange={(e) => {
                                    handleChange("bio", e.target.value)
                                }} type="text" name="bio" id="bio"
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="profilePicture">Profile Picture</label>
                                <input value={form.profilePicture} onChange={(e) => {
                                    handleChange("profilePicture", e.target.value)
                                }} type="text" name="profilePicture" id="profilePicture"
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nationality">Nationality</label>
                                <input value={form.nationality} onChange={(e) => {
                                    handleChange("nationality", e.target.value)
                                }} type="text" name="nationality" id="nationality"
                                       className="form-control"/>
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

export default UpdateAuthorComponent;