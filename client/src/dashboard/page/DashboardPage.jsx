import React, { useEffect } from 'react';
import DashboardLayout from "../DashboardLayout.jsx";
import DashboardCard from "../components/dashboard/DashboardCard.jsx";
import QuoteStore from "../store/QuoteStore.js";

const DashboardPage = () => {
    const {totalQuote, getQuoteList, quoteList}=QuoteStore();
    useEffect(() => {
     (async()=>{
        if(quoteList === null || quoteList.length === 0){
            await getQuoteList(1, 10, "published", "DESC", "");
        }
     })()   
    },[])

    let data = [
        //{title: "Quotes", count: "25", url: "#", text: "Go to quote list", love: "25", views: "25"},
        {title: "Authors", count: "3", url: "#", text: "Go to author list", love: "25", views: "25"},
        {title: "Categories", count: "31", url: "#", text: "Go to category list", love: "25", views: "25"},
        {title: "Users", count: "3", url: "#", text: "Go to user list", love: "25", views: "25"},

    ]
    data.push({title: "Quotes", count: totalQuote, url: "#", text: "Go to quote list", love: "25", views: "25"});
    
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