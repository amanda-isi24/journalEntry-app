import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './App.css';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/login", {
                username,
                password,
            });

            onLoginSuccess(res.data.user);

            // ✅ navigate to entries page after successful login
            navigate("/Entries");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="title">
            <h1>Journaling App</h1>
            <h3>Welcome</h3>

            <div className="login-container">
                <h2>Login</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div>

                        <input
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                        />
                    </div>
                    <button className="login-btn" type="submit">Log In</button>
                </form>
            </div>

        </div>



    );
};

export default Login;