import React from 'react';

const NotFoundComponent = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-12 my-5">
                            <h2 className="text-center">No Data Found.</h2>
                            <h2 style={{fontSize:60}} className="fw-bold text-center">404</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFoundComponent;