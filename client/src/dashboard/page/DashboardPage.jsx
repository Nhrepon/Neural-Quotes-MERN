import React from 'react';
import DashboardLayout from "../DashboardLayout.jsx";
import DashboardCard from "../components/dashboard/DashboardCard.jsx";

const DashboardPage = () => {

    const data = [
        {title: "Quotes", count: "25", url: "#", text: "Go to quote list", love: "25", views: "25"},
        {title: "Authors", count: "3", url: "#", text: "Go to author list", love: "25", views: "25"},
        {title: "Categories", count: "31", url: "#", text: "Go to category list", love: "25", views: "25"},
        {title: "Users", count: "3", url: "#", text: "Go to user list", love: "25", views: "25"},

    ]
    return (
        <DashboardLayout>
            <h2>Dashboard</h2>
            <hr/>
            <div className="container">
                <div className="row">
                    {
                        data && data.length > 0 && data.map((item, index) => {
                            return (
                                <div className="col-sm-4" key={index}>
                                    <DashboardCard data={item}/>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;