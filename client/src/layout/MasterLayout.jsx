import React from 'react';
import TopNavigationBar from "../components/TopNavigationBar.jsx";
import FooterComponent from "../components/FooterComponent.jsx";
import {Toaster} from "react-hot-toast";

const MasterLayout = (props) => {
    return (
        <div className="body">
            <TopNavigationBar/>
            {props.children}
            <FooterComponent/>
            <Toaster position="top-center"></Toaster>
        </div>
    );
};

export default MasterLayout;