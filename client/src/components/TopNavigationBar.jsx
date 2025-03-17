import React from "react";
import {Link} from "react-router-dom";
import $ from "jquery";
import {isLogin} from "../utility/Utility.js";
import toast from "react-hot-toast";
import UserStore from "../store/UserStore.js";
import {appName} from "../../config.js";



const TopNavigationBar = () => {
    const {userLogout} = UserStore();


    const handleLogout = async () => {
        await userLogout();
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = ("/");
    }

    // Change navigation bg on scroll ---------------------------------------------
    $(function () {
        let topNavBg = $(".top-nav");
        let gotoTop = $(".goto-top");
        $(window).scroll(function () {
            let scroll = $(window).scrollTop();

            if (scroll > 10) {
                topNavBg.removeClass('bg-transparent').addClass("bg-light");
                gotoTop.removeClass('d-none').addClass("d-flex");

            } else {
                topNavBg.removeClass("bg-light").addClass('bg-transparent');
                gotoTop.removeClass('d-flex').addClass("d-none");
            }
        });
    });

    const navItem = [
        {to: '/', title: 'Home'},
        {to: '/quote', title: 'Quotes'},
        {to: '/about', title: 'About'},
        {to: '/contact', title: 'Contact'},
    ]



    const search = ()=>{
        toast.success("searching...");
    }

    // const isLogin = ()=>{
    //   return false;
    // };


    return (
        <div className="container-fluid sticky-md-top bg-light z-3 shadow-sm top-nav">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-md">
                        <Link className="navbar-brand  text-dark fw-bold fs-4" to="/">
                            {appName}
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                {
                                    navItem.map((item, i) => (
                                        <li key={i} className="nav-item">
                                            <Link className="nav-link " to={item.to}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="search d-flex justify-content-center align-items-center position-relative">
                                <input className={"form-control"} type="search"/>
                                <i style={{cursor:"pointer"}} onClick={search} className={"bi bi-search position-absolute end-0 me-2"}></i>
                            </div>
                            <div className="d-flex gap-1">
                                <div className="dropdown">
                                    <a href="#"
                                       className="btn ms-3 d-flex align-items-center link-dark text-success text-decoration-none dropdown-toggle"
                                       id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-person-circle"></i>
                                    </a>
                                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">


                                        {
                                            isLogin() ?
                                                (
                                                    <>
                                                        <li><Link className="dropdown-item"
                                                                  to="/dashboard">Dashboard</Link></li>
                                                        <li><Link className="dropdown-item"
                                                                  to="/user">Profile</Link></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li><Link className="dropdown-item"
                                                                  to="/setting">Setting</Link></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li>
                                                            <button onClick={handleLogout} type="submit"
                                                                    className="dropdown-item" text="Logout">Logout
                                                            </button>
                                                        </li>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <li><Link className="dropdown-item"
                                                                  to="/registration">Registration</Link></li>
                                                        <li><Link className="dropdown-item" to="/login">Login</Link>
                                                        </li>
                                                    </>
                                                )
                                        }


                                    </ul>
                                </div>
                            </div>
                        </div>

                    </nav>
                </div>
            </div>
        </div>
    );
};

export default TopNavigationBar;
