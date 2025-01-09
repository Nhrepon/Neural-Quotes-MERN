import React from 'react';
import ReviewCardComponents from './ReviewCardComponents';

const ReviewComponents = () => {
    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="fs-1 fw-bold text-center mt-5">Reviews</h2>
                        <hr/>
                    </div>
                </div>
                <div className="row  gx-3 gy-2">
                    <div className="col-12 col-md-6">
                    <ReviewCardComponents/>
                    </div>

                    <div className="col-12 col-md-6">
                    <ReviewCardComponents/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewComponents;