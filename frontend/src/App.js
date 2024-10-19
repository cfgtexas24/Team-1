import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';
import Login from'./components/Login';
import LoginExisting from './components/LoginExistingUser'
import PatientDashboard from './components/PatientDashboard';
import ProviderDashboard from './components/ProviderDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient/login" element={<Login />} />
        <Route path="/patient/home" element={<PatientDashboard />}/>
        <Route path="/patient/login/existing" element={<LoginExisting />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      </Routes>

    </BrowserRouter>
  );
}


export default App;
