import React, {useEffect, useState} from 'react';
import AuthorStore from "../../store/AuthorStore.js";
import {modalHide} from "../../../utility/Utility.js";
import toast from "react-hot-toast";
import MediaPicker from "../media/MediaPicker.jsx";
import {backendUrl} from "../../../../config.js";

const UpdateAuthorComponent = (props) => {
    const {updateAuthor, getAuthorList} = AuthorStore();

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
            await modalHide(`update-${props.data._id}`);
            await getAuthorList();
            toast.success("Author updated successfully!");

        } else {
            toast.error(res.message);
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
                        <div className="modal-body d-flex flex-column gap-3">
                            <div className="form-group">
                                <label htmlFor="Name">Name</label>
                                <input value={form.name} onChange={(e) => {
                                    handleChange("name", e.target.value)
                                }} type="text" name="name" id="name"
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Bio</label>
                                <textarea value={form.bio} onChange={(e) => {
                                    handleChange("bio", e.target.value)
                                }} name="bio" id="bio"
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="profilePicture">Profile Picture</label>
                                <MediaPicker onInputChange={(filePath) => {
                                    handleChange("profilePicture", filePath)
                                }}/>
                                <input value={form.profilePicture} onChange={(e) => {
                                    handleChange("profilePicture", e.target.value)
                                }} type="text" name="profilePicture" id="profilePicture"
                                       className="form-control"/>
                                {
                                    form.profilePicture && (
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img className="rounded" src={backendUrl + form.profilePicture} alt={form.name}
                                                 crossOrigin={"anonymous"} width={80}/>
                                        </div>
                                    )
                                }
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