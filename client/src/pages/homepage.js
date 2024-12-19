import React from 'react';
import Layout from '../components/Layout/layout';
import { useAuth } from '../context/auth';

const Homepage = () => {
    const [auth] = useAuth();
    return (

        <Layout>
            <h1>Homepage</h1>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>

    );
};

export default Homepage;
