import React, {useEffect} from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import QuoteListComponent from "../components/quote/QuoteListComponent.jsx";
import QuoteStore from "../dashboard/store/QuoteStore.js";

const QuotePage = () => {

    return (
        <MasterLayout>
            <QuoteListComponent/>
        </MasterLayout>
    );
};

export default QuotePage;