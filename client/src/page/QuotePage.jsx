import React, {useEffect} from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import QuoteListComponent from "../components/quote/QuoteListComponent.jsx";
import QuoteStore from "../dashboard/store/QuoteStore.js";

const QuotePage = () => {

    return (
        <MasterLayout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="fs-2 fw-bold text-center mt-3">Quote</h2>
                        <hr/>
                    </div>
                </div>
            </div>
            <QuoteListComponent/>
        </MasterLayout>
    );
};

export default QuotePage;