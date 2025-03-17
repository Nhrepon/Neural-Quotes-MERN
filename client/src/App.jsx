import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./page/HomePage.jsx";
import DashboardPage from "./dashboard/page/DashboardPage.jsx";
import MediaPage from "./dashboard/page/MediaPage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import RegistrationPage from "./page/RegistrationPage.jsx";
import {isLogin} from "./utility/Utility.js";
import NotFoundPage from "./page/NotFoundPage.jsx";
import AboutPage from "./page/AboutPage.jsx";
import ContactPage from "./page/ContactPage.jsx";
import SinglePage from "./page/SinglePage.jsx";
import UserPage from "./dashboard/page/UserPage.jsx";
import CategoryPage from "./dashboard/page/CategoryPage.jsx";
import QuotesPage from "./dashboard/page/QuotesPage.jsx";
import AuthorPage from "./dashboard/page/AuthorPage.jsx";
import QuotePage from "./page/QuotePage.jsx";
import SingleQuotePage from "./page/SingleQuotePage.jsx";
import PrivacyPolicyPage from "./page/PrivacyPolicyPage.jsx";
import TermsAndConditionPage from "./page/TermsAndConditionPage.jsx";



const App = () => {
    const isLogedin = isLogin();

    const commonRuotes = [
        {path:'/', element:<HomePage/>},
        {path:'/about', element:<AboutPage/>},
        {path:'/contact', element:<ContactPage/>},
        {path:'/quote', element:<QuotePage/>},
        {path:'/quote/:id', element:<SingleQuotePage/>},
        {path:'/login', element:<LoginPage/>},
        {path:"/registration",element:<RegistrationPage/>},

        {path:"/details/:id",element:<SinglePage/>},

        {path:"/privacy-policy",element:<PrivacyPolicyPage/>},
        {path:"/terms-and-conditions",element:<TermsAndConditionPage/>},

        {path:"*", element:<NotFoundPage/>},
    ]

    const protectedRoutes = [
        {path:"/dashboard", element:<DashboardPage/>},
        {path:"/quotes", element:<QuotesPage/>},
        {path:"/media", element:<MediaPage/>},
        {path:"/category", element:<CategoryPage/>},
        {path:"/author", element:<AuthorPage/>},
        {path:"/user", element:<UserPage/>},

    ]

    const routes = isLogedin? [...protectedRoutes, ...commonRuotes]:[...commonRuotes];

    return (
        <BrowserRouter future={{ v7_startTransition: true }}>
            <Routes>
                {
                    routes.map(({path, element}, index)=>(
                        <Route path={path} element={element}  key={index}/>
                    ))
                }
            </Routes>
        </BrowserRouter>

    );


};

export default App;