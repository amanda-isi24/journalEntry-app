import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from './Login';
import Entries from './Entries';
import Signup from "./Signup";
import './App.css';

function Home() {
  const navigate = useNavigate();

  return (

    <div className="home">
      <h1 className="Heading1">Home Page</h1>
      <h3>Journal</h3>

      <button onClick={() => navigate("/Login")}>Login/Signup</button>

    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        {/* Add Route for Home page */}
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/Login"
          element={<Login onLoginSuccess={setUser} />}
        />

        <Route
          path="/Entries"
          element={user ? <Entries /> : <Navigate to="/Login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
