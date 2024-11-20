import React, {useState} from 'react';
import './style.css';
import axios from "axios";
import toast from "react-hot-toast";


const UploadMediaComponent = () => {
    const [file, setFile] = useState( null);

    const handleFileChange = (e) => {
        setFile([...e.target.files]);
    }


    const removeFile = (e)=>{
        setFile(file.filter((item, i)=> i !== e))
    }


    const uploadFile = async ()=>{
        let formData = new FormData();
        if (file!=null){
            file.map((item)=>{
                formData.append('file',item);
            })

            try {
                const res = await axios.post("/api/fileUpload", formData, { headers: { "Content-Type": "multipart/form-data" } });

                toast.success(`successfully uploaded ${res.data.files[0].destination }/${res.data.files[0].filename} `);
            }catch (e) {
                toast.error(`error${e}`);
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
                        <input className="form-control" type="file" multiple accept="image/*" onChange={handleFileChange} name="file"/>
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
                            file?.map((item, i) => {
                                return (
                                    <div key={i} className="cards rounded-3 shadow-sm">
                                        <img className="w-100 rounded-top-2" src={URL.createObjectURL(item)} alt="img"/>
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