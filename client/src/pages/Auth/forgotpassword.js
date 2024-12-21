import React, { useState } from 'react';
import Layout from '../../components/Layout/layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/authstyle.css";

const Forgotpassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState(""); // Corrected variable name
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', {
                email,
                newPassword, // Corrected variable name
                answer,
            });

            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message || "Password reset failed!");
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again!');
        }
    };

    return (
        <Layout title="Forgot Password">
            <div className="form-container">
                <h1>Forgot Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="answer" className="form-label">Security Answer</label>
                        <input
                            id="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your First School"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newpassword" className="form-label">New Password</label>
                        <input
                            id="newpassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your New Password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Reset
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Forgotpassword;
