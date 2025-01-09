import React from "react";
import './contact.css';
import {toast} from "react-hot-toast";

const ContactComponents = () => {


    const sendMessage = () => {
        toast.error("email required!");
    }


    return (

        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className="fs-1 fw-bold text-center mt-5">Contact Now</h2>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-8 p-0 pe-md-5">
                    <div className="row g-2 needs-validation my-3">
                        <div className="mb-2 input-group shadow-sm">
                            <input type="text" className="form-control px-4 py-3 border-0 shadow-none"
                                   id="name" placeholder="Name" required/>
                            <span className="input-group-text border-0 fs-5 text-success">
                                <i className="bi bi-person-circle"></i>
                            </span>
                        </div>


                        <div className="mb-2 input-group shadow-sm">
                            <input type="email" className="form-control px-4 py-3 border-0 shadow-none"
                                id="email" placeholder="Email Address" required />
                            <span className="input-group-text border-0 fs-5 text-success">
                                <i className="bi bi-envelope"></i>
                            </span>
                        </div>


                        <div className="mb-2 input-group shadow-sm">
                            <input type="text" className="form-control px-4 py-3 border-0 shadow-none"
                                id="mobile" placeholder="Mobile Number" required />
                            <span className="input-group-text border-0 fs-5 text-success">
                                <i className="bi bi-telephone"></i>
                            </span>
                        </div>


                        <div className="mb-2 input-group shadow-sm">
                            <input type="text" className="form-control px-4 py-3 border-0 shadow-none" id="subject"
                                   placeholder="Subject"/>
                            <span className="input-group-text border-0 fs-5 text-success">
                                <i className="bi bi-card-text"></i>
                            </span>
                        </div>

                        <div className="mb-3 input-group shadow-sm">
                            <textarea className="form-control px-4 py-3 border-0" id="message" rows="5" placeholder="Message"/>
                        </div>

                        <button onClick={sendMessage} type="submit" className="btn btn-success w-25">Submit</button>
                    </div>

                </div>
                <div className=" col-12 col-md-4 p-0 mt-4 bg-success">

                    <div className=" p-4">
                        <h2 className="fs-2 text-light fw-bold">Don't hesitate to send a message.</h2>
                        <div className="contact-info">
                            <div className="item py-2 my-3">
                                <div className="icon fs-3 p-0 text-success">
                                    <i className="bi bi-house"></i>
                                </div>
                                <div className="content p-0 text-light">
                                    <p className="fs-5 fw-bold p-0 m-0">Location</p>
                                    <p className="p-0 m-0">Shahajad pur, Maijdee, Noakhali, Bangladesh.</p>
                                </div>
                            </div>

                            <div className="item py-2 my-3">
                                <div className="icon fs-3 p-0  text-success">
                                    <i className="bi bi-mailbox-flag"></i>
                                </div>
                                <div className="content p-0 text-light">
                                    <p className="fs-5 fw-bold p-0 m-0">Drop a mail</p>
                                    <p className="p-0 m-0">nurhossainrepon7248@gmail.com</p>
                                </div>
                            </div>

                            <div className="item py-2 my-3">
                                <div className="icon fs-3 p-0  text-success">
                                    <i className="bi bi-whatsapp"></i>
                                </div>
                                <div className="content p-0 text-light">
                                    <p className="fs-5 fw-bold p-0 m-0">Whatsapp</p>
                                    <p className="p-0 m-0">+8801829-938427<br/> +88018-6677-5577</p>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactComponents;
