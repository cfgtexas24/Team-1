import React from 'react'

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" className="input-box" />
        <input type="password" placeholder="Password" className="input-box" />
        <button type="submit" className="submit-button">Create Account</button>
        <button type="button" className="link-button">Already have an Account?</button>
      </form>
    </div>
  )
}

export default Login