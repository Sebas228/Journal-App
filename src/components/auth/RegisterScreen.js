import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
  return (
    <div className="auth__form-container">
      <h2 className="auth__title mb-5">
        Register
        <small className="auth__subtitle">
          or <Link to="/auth/login" className="link">Sign in</Link>
        </small>
      </h2>

      <form>

        <input
          autoComplete="off"
          type="text"
          name="username"
          placeholder="Username"
          className="auth__form-input"
          spellCheck="false" />

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

        <input
          type="password"
          name="password2"
          placeholder="Password confirm"
          className="auth__form-input" />

        <button className="btn btn-primary btn-block mb-5" type="submit">Create account</button>

      </form>
    </div>
  )
}
