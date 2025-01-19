import React, {useEffect} from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import QuoteCardComponent from "../components/quote/QuoteCardComponent.jsx";
import QuoteStore from "../dashboard/store/QuoteStore.js";

const QuotePage = () => {
    const {quoteList, getQuoteList}=QuoteStore();
    useEffect(()=>{
        (async ()=>{
            await getQuoteList();
        })()
    },[])
    return (
        <MasterLayout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="fs-2 fw-bold text-center mt-3">Quote</h2>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    {quoteList && quoteList.length > 0 && quoteList.map((item, index) => {
                        return (
                            <div className="col-sm-4 d-flex flex-wrap" key={index}>
                                <QuoteCardComponent data={item}/>
                            </div>
                        )
                    })}

                </div>
            </div>
        </MasterLayout>
    );
};

export default QuotePage;