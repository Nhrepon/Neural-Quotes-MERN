import React from 'react';
import DashboardLayout from "../DashboardLayout.jsx";
import QuoteListComponents from "../components/quotes/QuoteListComponents.jsx";

const QuotesPage = () => {
    return (
        <DashboardLayout>
            <QuoteListComponents/>
        </DashboardLayout>
    );
};

export default QuotesPage;