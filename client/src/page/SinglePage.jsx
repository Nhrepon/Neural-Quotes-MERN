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
                <div className="col-6">
                    {
                        file && file.length > 0 && (
                            <img className={"card-img"} src={backendUrl + file[0].filePath} alt={file[0].name}
                                 crossOrigin={"anonymous"}/>
                        )
                    }
                </div>
            </div>
        </div>

    </MasterLayout>;
};

export default SinglePage;