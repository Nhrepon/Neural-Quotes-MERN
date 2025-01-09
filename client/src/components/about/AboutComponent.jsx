import React from 'react';
import './about.css';

const AboutComponent = () => {
    return (
        <div className="container-fluid">
            <div className="container about">
                <div className="row py-5">
                    <div className="col-md-6">

                        <div className="feature d-flex align-items-center justify-content-center">
                            <img className='img-fluid rounded-circle feature-img' src="/repon.PNG" alt="nhrepon"/>
                            <div className="feature-item">
                                <img className='img1' src="/react.svg" alt="React"/>
                                <img className='img2' src="/node.svg" alt="React"/>
                                <img className='img3' src="/mongodb.svg" alt="React"/>
                                <img className='img4' src="/laravel.svg" alt="React"/>
                                <img className='img5' src="/flutter.svg" alt="React"/>
                                <img className='img6' src="/dotnet.svg" alt="React"/>
                                <img className='img7' src="/android.svg" alt="React"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4 className='hello fs-5'>About Me</h4>
                        <h2 className='fs-1 fw-bold'><span className='text-danger'>Failure</span> Is The Condiment That
                            Gives <span className='text-success'>Success</span></h2>
                        <p>Full stack web application developer using React js, Node js, Express js and MongoDB.</p>

                        <button className="btn btn-success">Download CV</button>
                        <div className="col-12 py-4">
                            <p className='fs-5'><i className="bi bi-person-circle"></i>Nur Hossain</p>
                            <p className='fs-5'><i className="bi bi-envelope-at"></i>nurhossainrepon7248@gmail.com</p>
                            <p className='fs-5'><i className="bi bi-whatsapp"></i>+8801829938427</p>
                            <p className='fs-5'><i className="bi bi-geo-alt"></i>Chowmuhani, Noakhali, Bangladesh</p>
                            <p className='fs-5'><i className="bi bi-cake2"></i>08 June 1993</p>
                            
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutComponent;