import React from 'react';
import DashboardLayout from "../DashboardLayout.jsx";
import AuthorListComponents from "../components/author/authorListComponents.jsx";

const AuthorPage = () => {
    return (
        <DashboardLayout>
            <AuthorListComponents/>
        </DashboardLayout>
    );
};

export default AuthorPage;