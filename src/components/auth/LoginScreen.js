import React from 'react'
import { Link } from 'react-router-dom'

export const LoginScreen = () => {
  return (
    <div className="auth__form-container">
      <h2 className="auth__title mb-5">
        Login
        <small className="auth__subtitle">
          or <Link to="/auth/register" className="link">Create new account</Link>
        </small>
      </h2>

      <form>

        <input
          autoComplete="off"
          type="text"
          name="email"
          placeholder="Email"
          className="auth__form-input"
          spellCheck="false" />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="auth__form-input" />

        <button className="btn btn-primary btn-block" type="submit">Log In</button>

        <p className="line-with-text-dark mt-5">or</p>

        <div className="auth__social-networks">

          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

      </form>
    </div>
  )
}
