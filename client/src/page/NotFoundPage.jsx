import React from 'react';
import MasterLayout from '../layout/MasterLayout';

const NotFound = () => {
    return (
        <MasterLayout>
            <div className="container-fluid my-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center my-5">
                        <h1>Opps!</h1>
                        <h1 className='h-5' >404</h1>
                        <h2>Page Not Found</h2>
                    </div>
                </div>
            </div>
            </div>
        </MasterLayout>
    );
};

export default NotFound;