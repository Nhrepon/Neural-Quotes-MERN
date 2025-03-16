import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import ImageGridComponents from "../components/imageGrid/ImageGridComponents.jsx";
import QuoteListComponent from "../components/quote/QuoteListComponent.jsx";
import BannerComponents from "../components/banner/BannerComponents.jsx";
import QuoteByCategoryComponents from "../components/quote/QuoteByCategoryComponents.jsx";


const HomePage = () => {
    return (
        <MasterLayout>
            <BannerComponents/>
            <QuoteByCategoryComponents/>
            <QuoteListComponent/>
                        {/*<ImageGridComponents/>*/}

        </MasterLayout>
    );
};

export default HomePage;