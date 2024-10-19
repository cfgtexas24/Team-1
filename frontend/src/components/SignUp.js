import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Username" className="input-box" />
        <input type="password" placeholder="Password" className="input-box" />
        <Link to="/patient/survey-form" className="submit-button">
          Create Account
        </Link>
        <Link to="/patient/login" className="login-link">
         Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
