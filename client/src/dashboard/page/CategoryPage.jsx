import React from 'react';
import DashboardLayout from "../DashboardLayout.jsx";
import CategoryListComponents from "../components/category/CategoryListComponents.jsx";

const CategoryPage = () => {
    return (
        <DashboardLayout>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-3">
                        <h2>Categories</h2>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <CategoryListComponents/>
                </div>
            </div>

        </DashboardLayout>
    );
};

export default CategoryPage;