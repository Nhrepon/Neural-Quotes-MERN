import React from 'react';
import MasterLayout from '../layout/MasterLayout';
import ContactComponents from '../components/ContactComponents';

const ContactPage = () => {
    return (
        <MasterLayout>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mt-5">
                            <h2 className='fs-1 fw-bold'>Contact us</h2>
                            <hr />
                        </div>
                    </div>
                        <ContactComponents/>
                </div>
            </div>
        </MasterLayout>
    );
};

export default ContactPage;