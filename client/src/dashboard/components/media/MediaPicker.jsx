import React, {useEffect} from 'react';
import {backendUrl} from "../../../../config.js";
import MediaStore from "../../store/MediaStore.js";
import toast from "react-hot-toast";
import './mediaPicker.css';

const MediaPicker = (props) => {
    const {fileList, getFileList}=MediaStore();

    useEffect(() => {
        (async ()=>{
            await getFileList();
        })()
    }, []);

    const onSubmit=(filePath)=>{
        toast.success(filePath);
    }
    const btntog = ()=>{
        document.getElementById("custom-modal").classList.toggle("d-none");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <button  onClick={btntog}>modal</button>
                    <div className="d-none" id="custom-modal">
                        <div className="bg-light mx-auto" id="custom-modal-body">
                            <div className="d-flex justify-content-between">
                                <h5 className="modal-title" id="exampleModalLabel">Select image</h5>
                                <button type="button" className="btn-close" onClick=""></button>
                            </div>
                            <h2>hello this is custom modal</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <button className="btn text-primary border-0" data-bs-toggle="modals"
                            data-bs-target="#mediaPicker">Select image
                    </button>
                    <div className="modal fade text-start" id="mediaPicker" data-bs-backdrop="static"
                         data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Select image</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modals"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="grid-container my-2">
                                        {
                                            fileList?.map((item, i) => {
                                                return (
                                                    <div key={i} className="cards card rounded shadow-sm">
                                                        <img onClick={()=>{onSubmit(item.filePath)}} className="w-100 rounded-top-2"
                                                             title={item.name}
                                                             src={`${backendUrl + item.filePath}`} alt={item.name}
                                                             crossOrigin={"anonymous"}
                                                             onError={(e) => e.target.style.display = 'none'}/>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaPicker;