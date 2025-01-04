import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./page/HomePage.jsx";
import DashboardPage from "./dashboard/page/DashboardPage.jsx";
import MediaPage from "./dashboard/page/MediaPage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import RegistrationPage from "./page/RegistrationPage.jsx";
import {isLogin} from "./utility/Utility.js";
import NotFoundPage from "./page/NotFoundPage.jsx";



const App = () => {

    if(isLogin()){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}  />
                <Route path="/registration" element={<RegistrationPage/>}  />
                <Route path="/login" element={<LoginPage/>}  />
                <Route path="/dashboard" element={<DashboardPage/>}  />
                <Route path="/media" element={<MediaPage/>}  />
            </Routes>
        </BrowserRouter>

    );}
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}  />
                <Route path="/registration" element={<RegistrationPage/>}  />
                <Route path="/login" element={<LoginPage/>}  />

                <Route path="/*" element={<NotFoundPage/>}  />
            </Routes>
        </BrowserRouter>

    );

};

export default App;