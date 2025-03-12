import React, {useEffect, useState} from 'react';
import './style.css';
import axios from "axios";
import toast from "react-hot-toast";
import {DeleteAlert} from "../../../utility/Utility.js";
import {backendUrl} from "../../../../config.js";
import imageCompression from "browser-image-compression";
import MediaStore from "../../store/MediaStore.js";
import CategoryStore from "../../store/CategoryStore.js";


const UploadMediaComponent = () => {
    const {fileList, getFileList}=MediaStore();
    const [file, setFile] = useState( null);
    const {getCategoryList, categoryList}=CategoryStore();

    const handleFileChange = (e) => {
        setFile([...e.target.files]);
    }


    // const [imgFile, setImgFile] = useState(null);
    // const loadFile = async ()=>{
    //     const res = await axios.get("api/fileLoad");
    //     setImgFile(res.data.file);
    // }

    useEffect(() => {
        (async ()=>{
            await getFileList(1,20);
            await getCategoryList(1, 1000, 0);
        })()
    }, []);


    const removeFile = (e)=>{
        setFile(file.filter((item, i)=> i !== e))
    }

    const deleteFile = async (id)=>{
        if(await DeleteAlert()){
            const res = await axios.delete(`api/fileDelete/${id}`);
            if (res.data.status === "success") {
                await getFileList(1,20);
                toast.success(`${id} deleted successfully!`);
            }else {
                toast.error(res.data.message);
            }
        }


    }

    const uploadFile = async ()=>{
        let formData = new FormData();
        const categoryId = document.getElementById("categoryId").value;
        if(categoryId === ""){
            toast.error("Please, Select category name");
        }
        if (file!=null && file.length > 0){

            //files.forEach((file) => formData.append('file', file));

            for (const item of file) {
                const options = {
                    maxSizeMB: 1, // Maximum size in MB
                    maxWidthOrHeight: 1920, // Maximum width or height
                    useWebWorker: true, // Use a web worker for better performance
                    initialQuality: 1, // Control quality (100% quality)
                };

                // Compress the file
                const compressedBlob = await imageCompression(item, options);

                // Reconstruct file with original name and extension
                const originalName = item.name; // Get original file name
                const extension = originalName.split('.').pop(); // Extract extension
                const compressedFile = new File([compressedBlob], originalName, {
                    type: compressedBlob.type, // Preserve the MIME type
                });

                // Append the compressed file to FormData
                formData.append("file", compressedFile);
                formData.append("categoryId", categoryId);
            }


            // file.map(async (item) => {
            //
            //     const options = {
            //         maxSizeMB: 1, // Maximum size in MB
            //         maxWidthOrHeight: 1024, // Maximum width or height
            //         useWebWorker: true, // Use a web worker for better performance
            //     };
            //     const compressedFile = await imageCompression(item, options);
            //
            //     formData.append('file', compressedFile);
            //
            // })



            try {
                const res = await axios.post("/api/fileUpload", formData, { headers: { "Content-Type": "multipart/form-data" } });
                if(res['data'].status === "success"){
                    //setImgFile(res.data.path);
                    setFile(null);
                    await getFileList(1,20);
                    document.getElementById("file").value = "";
                    toast.success(`File upload success!`);
                }else {
                    toast.error(res.data.message);
                }

            }catch (e) {
                toast.error(`error occurred: ${e.message}`);
            }
        }else {
            toast.error("Please, Select images");
        }




    }



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 mt-3">
                    <h2>Upload Media</h2>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-4 border-end vh-100">
                    <div className="card shadow-lg p-5 gap-4">
                        <select name="categoryId" id="categoryId" className={"form-control"}>
                            {
                                categoryList && categoryList.map((item)=>{
                                    return (
                                        <option value={item._id}>{item.categoryName}</option>
                                    )
                                })
                            }
                        </select>
                        <input id={"file"} className="form-control" type="file" multiple accept="image/*" onChange={handleFileChange} name="file"/>
                        <button onClick={uploadFile} className="btn btn-success" type="submit">Upload Media</button>
                    </div>
                    <div className="my-4 overflow-hidden" style={{columns:2, columnGap:"15px"}}>
                        {
                            file?.map((item, i) => {
                                return (
                                    <div key={i} className="card rounded shadow-sm mb-3">
                                            <span className="position-absolute bg-light px-1 rounded"
                                                  style={{right: 5, top: 5}} onClick={() => removeFile(i)}>
                                                <i className="bi bi-x-square-fill"></i>
                                            </span>
                                        <img className="card-img rounded" src={URL.createObjectURL(item)}
                                             alt="img"/>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="col-8">
                    <div className="grid-container my-2">
                        {
                            fileList?.map((item, i) => {
                                return (
                                    <div key={i} className="cards card rounded shadow-sm">
                                        {/*<img className="w-100 rounded-top-2" src={URL.createObjectURL(item)} alt="img"/>*/}
                                        <span className="position-absolute rounded"
                                              style={{right: 5, top: 5}} onClick={() => deleteFile(item._id)}>
                                                <i className="bi bi-x-circle bg-light px-1 rounded"></i>
                                        </span>
                                        <img className="w-100 rounded-top-2"
                                             title={item.name}
                                             src={`${backendUrl + item.filePath}`} alt={item.name}
                                             crossOrigin={"anonymous"}
                                             onError={(e) => e.target.style.display = 'none'}/>
                                        <div className="d-flex justify-content-between px-2 mt-2">
                                            <p>title</p>
                                            <p><i className="bi bi-suit-heart"></i> 5</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    {/*{*/}
                    {/*    file?.map((item) => {*/}
                    {/*        return (<img src={URL.createObjectURL(item)} alt="" className="w-25 card-img"/>)*/}
                    {/*    })*/}
                    {/*}*/}
                </div>
            </div>
        </div>
    );
};

export default UploadMediaComponent;