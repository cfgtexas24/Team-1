import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyForm from './components/SurveyForm';

function App() {
  return (
    <div className="App">
        <header className="App-header">
        <h1>Welcome to the Client Survey</h1>
        <SurveyForm />
        </header>
    </div>
    );
}

export default App;

