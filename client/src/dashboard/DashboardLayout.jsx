import React from 'react';

import DashboardPage from "./page/DashboardPage.jsx";
import DashboardSidebar from "./components/DashboardSidebar.jsx";

const DashboardLayout = (props) => {


    return (
        <div className="container-fluid">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 col-sm-3 col-md-2 bg-success">
                        <DashboardSidebar/>
                    </div>
                    <div className="col-10 col-sm-9 col-md-10">
                        {props.children}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;