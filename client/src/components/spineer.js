import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Spineer = () => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => {
                if (prevValue <= 1) {
                    clearInterval(interval)
                    navigate('/login', {
                        state: location.pathname,
                    });
                    return 0
                }
                return prevValue - 1
            })
        }, 1000)

        // Cleanup the interval on unmount
        return () => clearInterval(interval)
    }, [count, navigate, location])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <h1 className='text-center'>Redirecting to you in {count} second{count !== 1 ? 's' : ''}</h1>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spineer
