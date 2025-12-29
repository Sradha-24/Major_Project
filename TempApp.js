import logo from './logo.svg';
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import './App.css';
import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"; 
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
         <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
         <Route path="/doctor-dashboard" element={<DoctorDashboard />}/>
         <Route path="/patient-dashboard" element={<PatientDashboard />}/>
      </Routes>
    </Router>
  )
 }

export default App;
