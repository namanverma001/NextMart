import React from 'react';
import Header from './header';
import Footer from './footer';
import { Helmet } from 'react-helmet'
import toast, { Toaster } from 'react-hot-toast';
const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charset="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>

            </Helmet>
            <Header />
            <main style={{ minHeight: "70vh" }}>
                <Toaster />
                {children}</main>
            <Footer />
        </div>
    );
};


Layout.defaultProps = {
    title: "NextMart-shope now",
    description: "mern stack project",
    keywords: "mern, react, node, mongodb",
    author: "namanverma",
};
export default Layout;






