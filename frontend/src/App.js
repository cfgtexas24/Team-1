import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PatientDashboard from './components/PatientDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import AdminDashboard from './components/AdminDashboard'; // Import the AdminDashboard component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient/login" element={<Login />} />
        <Route path="/patient/home" element={<PatientDashboard />} />
        <Route path="/patient/signup" element={<SignUp />} />
        {/* Standalone Admin Dashboard Route */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
