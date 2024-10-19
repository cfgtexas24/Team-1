import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" className="input-box" />
        <input type="password" placeholder="Password" className="input-box" />
        <Link to="/patient-dashboard"className="submit-button">Submit</Link>
        <Link to="/">Create Account</Link>
      </form>
    </div>
  )
}

export default Login