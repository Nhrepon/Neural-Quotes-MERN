import React from 'react';
import TopNavigationBar from "../components/TopNavigationBar.jsx";
import FooterComponent from "../components/FooterComponent.jsx";

const MasterLayout = (props) => {
    return (
        <div className="body container-fluid">
            <TopNavigationBar/>
            {props.children}
            <FooterComponent/>
        </div>
    );
};

export default MasterLayout;