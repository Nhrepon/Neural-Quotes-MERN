import React from 'react';
import UploadMediaComponent from "../components/media/UploadMediaComponent.jsx";
import DashboardLayout from "../DashboardLayout.jsx";

const MediaPage = () => {
    return (
        <DashboardLayout>
            <UploadMediaComponent/>
        </DashboardLayout>
    );
};

export default MediaPage;