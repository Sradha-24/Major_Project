import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DNAHelix from "../components/DNAHelix";
import "../styles/Auth.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", role: "",email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", formData);
    navigate("/login"); // redirect after register
  };

  return (
    <div className="auth-container">
      <DNAHelix /> {/* DNA background */}
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="select-wrapper">
          <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          >
           <option value="">Select Role</option>
           <option value="doctor">Doctor</option>
           <option value="patient">Patient</option>
          </select>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn">Register</button>
        </form>
        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
