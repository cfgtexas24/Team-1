import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PatientDashboard from './components/PatientDashboard';
import AdminDashboard from './components/AdminDashboard'; // Import the AdminDashboard component
import './AdminDashboard.css';


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
      </Routes>
    </BrowserRouter>
  );
}


export default App;
