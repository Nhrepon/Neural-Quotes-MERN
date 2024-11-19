import React, {useState} from 'react';
import './style.css';


const UploadMediaComponent = () => {
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile([...e.target.files]);
    }

    console.log(file)



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
                        <input type="file" multiple accept="image/*" onChange={handleFileChange}/>
                        <button type="submit">Upload Media</button>
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