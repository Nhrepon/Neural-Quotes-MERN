import React from 'react';
import './loader.css';
const Loader = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-center vh-100">
                        <div className="loader"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;