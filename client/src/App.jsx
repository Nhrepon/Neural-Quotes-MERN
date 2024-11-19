import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./page/HomePage.jsx";
import DashboardPage from "./dashboard/page/DashboardPage.jsx";
import MediaPage from "./dashboard/page/MediaPage.jsx";



const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}  />
                <Route path="/dashboard" element={<DashboardPage/>}  />

                <Route path="/media" element={<MediaPage/>}  />
            </Routes>
        </BrowserRouter>

    );
};

export default App;