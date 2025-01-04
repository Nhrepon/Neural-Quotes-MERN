import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import SubmitButton from "./SubmitButton.jsx";
import UserStore from "../../store/UserStore.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import {toast} from "react-hot-toast";
import {redirect} from "react-router";

const LoginComponent = () => {

    const navigate = useNavigate();
    const {loginFormValue, loginFormOnChange, userLogin} = UserStore();


    const loginSubmit = async () => {
        if (!ValidationHelper.IsEmail(loginFormValue.email)) {
            toast.error("Valid email required!");
        } else {
            let response = await userLogin(loginFormValue);
            if (response === true) {
                toast.success("Login success!");
                window.location.href = "/dashboard";
                //navigate("/dashboard");
            } else if (response === false) {
                toast.error("userNotFound")
            } else {
                toast.error("failed")
            }
        }


    }


    return (
        <div className='container-fluid'>
            <div className="container">
                <div className="row justify-content-center my-5">
                    <div className="card col-12 col-md-6 col-lg-4 my-5 shadow-lg">
                        <form className="row g-3 needs-validation my-1 card-body">
                            <div className="col-12">
                                <input type="email" className="form-control" id="email"
                                       placeholder="Enter email address"
                                       value={loginFormValue.email} onChange={(e) => {
                                    loginFormOnChange("email", e.target.value)
                                }} required/>
                            </div>
                            <div className="col-12">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter password"
                                    value={loginFormValue.password}
                                    onChange={(e) => {
                                        loginFormOnChange("password", e.target.value)
                                    }}
                                    required
                                />
                            </div>

                            <div className="col-12 text-center">
                                <SubmitButton onClick={loginSubmit} type="submit" className="btn btn-success"
                                              text="Login"/>
                                <hr/>

                                <div className="d-flex gap-2">
                                    <p>Login with:</p>
                                    <i className="bi bi-google"></i>
                                    <i className="bi bi-facebook"></i>
                                    <i className="bi bi-twitter"></i>
                                    <i className="bi bi-github"></i>
                                    <i className="bi bi-whatsapp"></i>
                                </div>
                                <p className=" my-5">Don't have an account? <Link to="/registration" className="nav-link fw-bold">Create
                                    account</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;