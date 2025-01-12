import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import UserStore from "../../store/UserStore.js";

const DashboardSidebar = () => {

    const {userLogout, getUserProfile, userProfileForm} = UserStore();
    useEffect(()=>{
        (async ()=>{
            await getUserProfile();
            console.log("user data: "+ userProfileForm);
        })()
    },[]);

    const handleLogout = async () => {
        await userLogout();
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = ("/");
    }

    return (

        <div className="sidebar position-sticky top-0 min-vh-100">
            <h2 className="text-light text-center mt-2">
            <i className="bi bi-speedometer me-2"></i>
            <Link to="/dashboard" className="d-none d-sm-inline-block fs-2 nav-link">Dashboard</Link>
            </h2>
            <hr/>

            <ul
                className="list-unstyled"
                id="menu"
            >
                <li className="nav-item bg-light p-1 p-sm-2 rounded my-2 d-flex">
                    <Link to="/" className="nav-link">
                        <i className="bi-house-fill"></i>
                        <span className="ms-2 d-none d-sm-inline">Home</span>
                    </Link>
                </li>
                <li className="nav-item bg-light p-2 rounded my-2">
                    <Link to="#post" className="nav-link" data-bs-toggle="collapse" aria-expanded="false"
                          aria-controls="post">
                        <i className="bi bi-card-text"></i>
                        <span className="ms-2 d-none d-sm-inline">Quotes</span>
                    </Link>
                </li>
                <ul className="collapse list-unstyled ms-3 " id="post" data-bs-parent="#menu">
                    <li className="nav-item bg-light px-2 py-1 rounded my-2">
                        <Link to="/new-post" className="nav-link">
                            <span className="d-none d-sm-inline">New post</span>
                            <span className="d-sm-none d-inline-block">New</span>
                        </Link>
                    </li>
                    <li className="nav-item bg-light px-2 py-1 rounded my-2">
                        <Link to="/all-post" className="nav-link link-dark">
                            <span className="d-none d-sm-inline">All post</span>
                            <span className="d-sm-none d-inline-block">All</span>
                        </Link>
                    </li>
                    <li className="nav-item bg-light px-2 py-1 rounded my-2">
                        <Link to="/category" className="nav-link">
                            <span className="d-none d-sm-inline">Category</span>
                            <span className="d-sm-none d-inline-block">Cat</span>
                        </Link>
                    </li>
                    <li className="nav-item bg-light px-2 py-1 rounded my-2">
                        <Link to="/tags" className="nav-link">
                            <span className="d-none d-sm-inline">Tags</span>
                            <span className="d-sm-none d-inline-block">Tags</span>
                        </Link>
                    </li>
                </ul>
                <li className="nav-item bg-light p-2 rounded my-2">
                    <Link to="/media" className="nav-link px-0 align-middle">
                        <i className="bi bi-card-image "></i>
                        <span className="ms-2 d-none d-sm-inline">Media</span>
                    </Link>
                </li>
                <li className="nav-item bg-light p-2 rounded my-2">
                    <Link to="/category" className="nav-link">
                        <i className="bi bi-briefcase"></i>
                        <span className="ms-2 d-none d-sm-inline">Category</span>
                    </Link>
                </li>

                <li className="nav-item bg-light p-2 rounded my-2">
                    <Link to="#Products" data-bs-toggle="collapse" className="nav-link">
                        <i className="bi-cart4"></i>
                        <span className="ms-1 d-none d-sm-inline">Products</span>
                    </Link>
                </li>
                <ul className="collapse list-unstyled ms-3  " id="Products" data-bs-parent="#menu">
                    <li className="nav-item bg-light px-2 py-1 rounded my-2">
                        <a href="#" className="nav-link px-0 link-dark">
                            <span className="d-none d-sm-inline">Product</span> 1
                        </a>
                    </li>
                    <li className="nav-item bg-light px-2 py-1 rounded my-2">
                        <a href="#" className="nav-link px-0 link-dark">
                            <span className="d-none d-sm-inline">Product</span> 2
                        </a>
                    </li>
                    <li className="nav-item bg-light px-2 py-1 rounded my-2">
                        <a href="#" className="nav-link px-0 link-dark">
                            <span className="d-none d-sm-inline">Product</span> 3
                        </a>
                    </li>
                    <li className="nav-item bg-light px-2 py-1 rounded my-2">
                        <a href="#" className="nav-link px-0 link-dark">
                            <span className="d-none d-sm-inline">Product</span> 4
                        </a>
                    </li>
                </ul>
                <li className="nav-item bg-light p-2 rounded my-2">
                    <a href="#" className="nav-link px-0 align-middle link-dark">
                        <i className="bi-people"></i>
                        <span className="ms-1 d-none d-sm-inline">Customers</span>
                    </a>
                </li>
                <li className="nav-item bg-light p-2 rounded my-2">
                    <Link to="/user" className="nav-link px-0 align-middle link-dark">
                        <i className="bi bi-person-circle"></i>
                        <span className="ms-1 d-none d-sm-inline">User</span>
                    </Link>
                </li>
            </ul>

            <hr/>

            <div className="dropdown mb-3 ms-3 bottom-0 position-absolute">
                <a href="#" className="d-flex text-wrap align-items-center link-dark text-decoration-none dropdown-toggle"
                   id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="./vite.svg" alt="home" width="32" height="32"
                         className="rounded-circle me-2"/>
                    <strong>{userProfileForm.userName}</strong>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li>
                        <Link to="/profile" className="dropdown-item">
                            New project...
                        </Link>
                    </li>
                    <li>
                        <Link to="/setting" a className="dropdown-item">
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="dropdown-item">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li>
                        <Link onClick={handleLogout} className="dropdown-item" to="#">
                            Sign out
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default DashboardSidebar;