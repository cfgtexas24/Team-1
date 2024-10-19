import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PatientDashboard from './components/PatientDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import AdminDashboard from './components/AdminDashboard'; // Import the AdminDashboard component
import './AdminDashboard.css';
import SurveyForm from './components/SurveyForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/patient/login" element={<Login />} />
        <Route path="/patient/home" element={<PatientDashboard />} />
        {/* Standalone Admin Dashboard Route */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/survey-form" element={<SurveyForm />} />

      </Routes>
    </BrowserRouter>
  );
}


export default App;
