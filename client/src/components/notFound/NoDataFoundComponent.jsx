import React from 'react';

const NoDataFoundComponent = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-12 my-5">
                            <h2 className="text-center fs-1">No Data Found.</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NoDataFoundComponent;