import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import MediaPage from "./page/MediaPage.jsx";

const DashboardRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/media" element={<MediaPage/>}  />
            </Routes>
        </BrowserRouter>
    );
};

export default DashboardRouter;