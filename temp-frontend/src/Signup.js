import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/signup", {
                username,
                email,
                password,
            });

            // ✅ redirect to login after success
            setTimeout(() => {
                navigate("/login");
            }, 1000);

            setMessage(res.data.message || "Signup successful!");
        }

        catch (err) {
            console.error(err);
            setMessage("Signup failed. Please try again.");
        }
    };

    return (
        <div>
            <h1 className="signup-title"> Welcome </h1>
            <div className="signup-container" style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ display: "block", margin: "10px auto", padding: "8px" }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ display: "block", margin: "10px auto", padding: "8px" }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ display: "block", margin: "10px auto", padding: "8px" }}
                    />
                    <button type="submit" style={{ padding: "10px 20px", marginTop: "10px" }}>
                        Sign Up
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};
export default Signup;
