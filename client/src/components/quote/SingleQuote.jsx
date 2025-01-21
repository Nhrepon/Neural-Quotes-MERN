import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from "axios";

const SingleQuote = () => {
    const {id}=useParams();
    const [quote, setQuote] = useState();
    useEffect(()=>{
        (async ()=>{
            const res = await axios.get("/api/singleQuote/"+id);
            if (res.data.status === "success"){
                setQuote(res.data.data[0]);
            }
        })()
    },[])

    return (
        <div className="container">
<div className="row">
    <div className="col-12">
        {
            quote && (
                <h2>{quote.quote}</h2>
            )
        }
    </div>
</div>
        </div>
    );
};

export default SingleQuote;