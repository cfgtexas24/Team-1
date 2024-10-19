import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from './components/SignUp';
import Login from './components/Login';
import PatientDashboard from './components/PatientDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import AdminDashboard from './components/AdminDashboard'; // Import the AdminDashboard component
import PatientList from './components/PatientList'; //up
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
        <Route path="/patient-list" element={<PatientList />} />
        <Route path="/survey-form" element={<SurveyForm />} />
        <Route path="/provider-dashboard/:id" element={<ProviderDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
