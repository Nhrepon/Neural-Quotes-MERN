import React from 'react';

import DashboardSidebar from "./components/DashboardSidebar.jsx";
import {Toaster} from "react-hot-toast";


const DashboardLayout = (props) => {


    return (
        <div className="container-fluid">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 col-sm-3 col-md-2 bg-success position-fixed clearfix">
                        <DashboardSidebar/>
                    </div>
                    <div className="col-10 col-sm-9 col-md-10 my-3" style={{marginLeft:"17%"}}>
                        {props.children}
                    </div>
                </div>
            </div>
            <Toaster position={"top-center"} />
        </div>
    );
};

export default DashboardLayout;