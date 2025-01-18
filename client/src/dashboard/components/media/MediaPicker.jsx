import React, {useEffect, useState} from 'react';
import {backendUrl} from "../../../../config.js";
import MediaStore from "../../store/MediaStore.js";
import toast from "react-hot-toast";
import './mediaPicker.css';

const MediaPicker = ({onInputChange}) => {
    const {fileList, getFileList}=MediaStore();
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        (async ()=>{
            if (!fileList){
                await getFileList();
            }
        })()
    }, [fileList]);

    // const onSubmit=async (filePath)=>{
    //     await onInputChange(filePath);
    //     toast.success(filePath);
    //     closeButton();
    // }
    // const btntog = ()=>{
    //     document.getElementById("custom-modal").classList.toggle("d-none");
    // }
    // const closeButton = ()=>{
    //     document.getElementById("custom-modal").classList.add("d-none");
    // }

    const handleFileSelect = async (filePath) => {
        await onInputChange(filePath); // Pass the file path to the parent
        toast.success("Image selected successfully.");
        setIsModalVisible(false); // Close modal
    };

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);


    return (
        <div>

                    <button className="btn btn-success my-2 " onClick={openModal}>Select image</button>
            {
                isModalVisible && (


                    <div className="custom-modal">
                        <div className="bg-light mx-auto custom-modal-content">
                            <div className="d-flex justify-content-between">
                                <h5 className="modal-title">Select image</h5>
                                <button type="button" className="btn-close"  onClick={closeModal}></button>
                            </div>
                            <div className="custom-modal-body">
                                <div className="grid-container my-2">
                                    {
                                        fileList?.map((item, i) => {
                                            return (
                                                <div key={i} className="cards card rounded shadow-sm">
                                                    <img onClick={ () => {
                                                        handleFileSelect(item.filePath)
                                                    }} className="w-100 rounded-top-2"
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
                )
            }
        </div>
    );
};

export default MediaPicker;