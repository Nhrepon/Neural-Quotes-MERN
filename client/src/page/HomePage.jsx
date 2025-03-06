import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import ImageGridComponents from "../components/imageGrid/ImageGridComponents.jsx";
import QuoteListComponent from "../components/quote/QuoteListComponent.jsx";

const HomePage = () => {
    return (
        <MasterLayout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <QuoteListComponent/>
                    </div>
                    <div className="col-sm-6">
                        <ImageGridComponents/>
                    </div>
                </div>
            </div>



        </MasterLayout>
    );
};

export default HomePage;