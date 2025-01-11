import React, {useEffect, useState} from 'react';
import './style.css';
import axios from "axios";
import toast from "react-hot-toast";
import {DeleteAlert} from "../../../utility/Utility.js";
import {backendUrl} from "../../../../config.js";


const UploadMediaComponent = () => {
    const [file, setFile] = useState( null);

    const handleFileChange = (e) => {
        setFile([...e.target.files]);
    }


    const [imgFile, setImgFile] = useState(null);
    const loadFile = async ()=>{
        const res = await axios.get("api/fileLoad");
        setImgFile(res.data.file);
    }

    useEffect(() => {
        (async ()=>{
            await loadFile();
        })()
    }, []);


    const removeFile = (e)=>{
        setFile(file.filter((item, i)=> i !== e))
    }

    const deleteFile = async (id)=>{
        if(await DeleteAlert()){
            const res = await axios.delete(`api/fileDelete/${id}`);
            if (res.data.status === "success") {
                await loadFile();
                toast.success(`${id} deleted successfully!`);
            }else {
                toast.error(`${id} deleted failed! and message ${res.data.status}`);
            }
        }


    }

    const uploadFile = async ()=>{
        let formData = new FormData();
        if (file!=null){
            file.map((item)=>{
                formData.append('file',item);
            })

            try {
                const res = await axios.post("/api/fileUpload", formData, { headers: { "Content-Type": "multipart/form-data" } });
                if(res['data'].status === "success"){
                    //setImgFile(res.data.path);
                    setFile(null);
                    await loadFile();
                    document.getElementById("file").value = "";
                    toast.success(`File upload success!`);
                }else {
                    toast.error(`File upload failed!`);
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
                            imgFile?.map((item, i) => {
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