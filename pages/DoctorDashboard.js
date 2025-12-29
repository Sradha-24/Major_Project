import React from "react";
import DNAHelix from "../components/DNAHelix";
import "../styles/Dashboard.css";

function DoctorDashboard() {
  return (
    <div className="dashboard-container">
      <DNAHelix />
      <div className="dashboard-card">
        <h1 className="dashboard-title">Doctor Dashboard</h1>
        <div className="dashboard-grid">
          <div className="dashboard-box">
            <h2>Patient List</h2>
            <p>View and manage registered patients.</p>
          </div>
          <div className="dashboard-box">
            <h2>Analytics</h2>
            <p>Emotion recognition and health predictions.</p>
          </div>
          <div className="dashboard-box">
            <h2>Reports</h2>
            <p>Generate detailed patient reports.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
