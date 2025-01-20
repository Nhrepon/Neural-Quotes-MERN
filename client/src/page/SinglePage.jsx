import React, {useEffect, useState} from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import axios from "axios";
import {useParams} from "react-router";
import {backendUrl} from "../../config.js";

const SinglePage = () => {

    const {id} = useParams();
    const [file, setFile] = useState(null);

    const loadFile = async ()=>{
        try{
            const response = await axios.get(`/api/singleFile/${id}`);
            setFile(response.data["data"]);
        }catch (e) {
            return ({status:"error", message:e.message})
        }
    }
    useEffect( ()=>{
        (async ()=>{
            await loadFile();
        })()

    }, []);



    return <MasterLayout>
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    {
                        file && file.length > 0 && (
                            <div className="card my-2">
                                <img className={"card-img"} src={backendUrl + file[0].filePath} alt={file[0].name}
                                     crossOrigin={"anonymous"}/>
                            </div>
                        )
                    }
                </div>
                <div className="col-sm-4">
                    <h2>image details</h2>
                    {
                        file && (
                            <div>
                                <p>Uploaded on: {file[0].category["categoryName"]}</p>
                                <p>Uploaded By: {file[0].user["userName"]}</p>
                            </div>
                        )
                    }
                </div>
                <div className="col-sm-4">
                    <h3>Load similar</h3>
                </div>
            </div>
        </div>

    </MasterLayout>;
};

export default SinglePage;