import React, { useState } from 'react';
import Layout from '../../components/Layout/layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/authstyle.css"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Corrected API endpoint
            const res = await axios.post('/api/v1/auth/login', {
                email,
                password, // Corrected to lowercase 'password'
            });

            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/');
            } else {
                toast.error(res.data.message || "Registration failed!");
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again!');
        }
    };

    return (
        <Layout title="Login NextMart">
            <div className="form-container">
                <h1>Login Page</h1>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Login
