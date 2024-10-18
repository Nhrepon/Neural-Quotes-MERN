import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./page/HomePage.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";



const App = () => {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}  />
                <Route path="/dashboard" element={<Dashboard/>}  />
            </Routes>
        </BrowserRouter>

    );
};

export default App;