import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyForm from './components/SurveyForm';

function App() {
  return (
    <div>
      {/* First div for your container and form */}
      <div className="container">
        <h1>Abide</h1>
        <form>
          <input type="text" placeholder="Username" className="input-box" />
          <input type="password" placeholder="Password" className="input-box" />
          <button type="submit" className="submit-button">Create Account</button>
          <button type="button" className="link-button">Already have an Account?</button>
        </form>
      </div> 
      {/* Second div for your survey form */}
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Client Survey</h1>
          <SurveyForm />
        </header>
      </div>
    </div> // Closing the outermost div that wraps both
  );
}

export default App;

