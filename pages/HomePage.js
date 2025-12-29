import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import DNAHelix from "../components/DNAHelix";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <DNAHelix />

      <nav className="navbar">
        {/* Left Side: Main Pages */}
        <div className="nav-links">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/about")}>About</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
        </div>

        {/* Right Side: Auth Buttons */}
        <div className="nav-auth">
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="register-btn" onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      <div className="title-section">
        <h1 className="home-title">Hereditary Disease Prediction System</h1>
        <p className="home-subtitle">AI-powered insights for a healthier future</p>
      </div>
    </div>
  );
}

export default HomePage;