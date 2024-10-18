import React from 'react';

import DashboardPage from "./page/DashboardPage.jsx";

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h2>Dashboard</h2>
                        <hr/>
                        <ul>
                            <li><a href="#">Post</a></li>
                            <li><a href="#">Post</a></li>
                            <li><a href="#">Post</a></li>
                        </ul>
                    </div>
                    <div className="col-9">
                        <DashboardPage/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;