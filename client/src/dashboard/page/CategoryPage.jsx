import React from 'react';
import DashboardLayout from "../DashboardLayout.jsx";
import CategoryListComponents from "../components/category/CategoryListComponents.jsx";

const CategoryPage = () => {
    return (
        <DashboardLayout>
            <div className="container">
                <div className="row">
                    <CategoryListComponents/>
                </div>
            </div>

        </DashboardLayout>
    );
};

export default CategoryPage;