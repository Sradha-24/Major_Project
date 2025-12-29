import React from "react";
import { NavLink } from "react-router-dom";
import DNAHelix from "../components/DNAHelix";
import DiabetesForm from "../components/DiabetesForm";
import "../styles/Dashboard.css";

function PatientDashboard() {
  return (
    <div className="dashboard-layout">
      {/* Your DNA Background */}
      <div className="dna-bg-overlay">
        <DNAHelix />
      </div>

      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="logo-icon">👤</span>
          <div className="brand-text">
            <span className="username">Username</span>
            <span className="user-status">Patient Portal</span>
          </div>
        </div>
        
        <nav className="sidebar-links">
          <NavLink to="/" className="sidebar-link">Home</NavLink>
          <NavLink to="/my-health" className="sidebar-link">My Health</NavLink>
          <NavLink to="/recommendations" className="sidebar-link">Recommendations</NavLink>
          <NavLink to="/history" className="sidebar-link">History</NavLink>
          <NavLink to="/diabetes-risk" className="sidebar-link active">Diabetes Risk</NavLink>
          <NavLink to="/logout" className="sidebar-link logout">Logout</NavLink>
        </nav>

        
      </aside>

      <main className="dashboard-main">
        <header className="main-header">
          <h1>Patient Dashboard</h1>
          <p>Provide your clinical data for a risk assessment.</p>
        </header>

        {/* This is the high-blur card you requested */}
        <section className="form-card-container">
          <div className="form-header">
            <h2>Diabetes Risk Prediction</h2>
          </div>
          <div className="form-content">
            <DiabetesForm />
          </div>
        </section>
      </main>
    </div>
  );
}

export default PatientDashboard;