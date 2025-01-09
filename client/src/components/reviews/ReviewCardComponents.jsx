import React from 'react';

const ReviewCardComponents = () => {
    return (
        <div className='container bg-light px-4 py-2 rounded-3'>
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-4 p-0 rounded-circle border-2 shadow-lg">
                    <img className='zoom review-img card-img rounded-circle border-2 border-success' src="/nhrepon.jpg" alt="nhrepon" />
                </div>
                <div className="col-12 col-md-8 card-body ps-4">
                    <p className='card-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus provident sit sunt aperiam ut est, cum enim omnis officia nemo quaerat mollitia excepturi atque error cumque dignissimos harum veniam molestiae.</p>
                    <h5 className='card-title'>Rabbil Hasan Rupon</h5>
                    <p>Assitant manager, IDLC ltd</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCardComponents;