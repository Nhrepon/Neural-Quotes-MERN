import React from 'react';
import MasterLayout from '../layout/MasterLayout';
import ContactComponents from "../components/contact/ContactComponents.jsx";


const ContactPage = () => {
    return (
        <MasterLayout>
            <div className="container-fluid">
                <ContactComponents/>
            </div>
        </MasterLayout>
    );
};

export default ContactPage;