import React from 'react';
import MasterLayout from '../layout/MasterLayout';
import LoginComponent from '../components/users/LoginComponent';

const LoginPage = () => {
    return (
        <MasterLayout>
            <LoginComponent/>
        </MasterLayout>
    );
};

export default LoginPage;