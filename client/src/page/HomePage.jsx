import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import ImageGridComponents from "../components/imageGrid/ImageGridComponents.jsx";
import QuoteListComponent from "../components/quote/QuoteListComponent.jsx";

const HomePage = () => {
    return (
        <MasterLayout>
            <div className="container">
                <div className="row">

                        <QuoteListComponent/>
                        <ImageGridComponents/>

                </div>
            </div>



        </MasterLayout>
    );
};

export default HomePage;