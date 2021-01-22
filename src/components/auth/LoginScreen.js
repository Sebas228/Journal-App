import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useForm } from '../../hooks/useForm'
import { startGoogleLogin, startLoginEmailPassword } from '../../redux/actions/authActions'
import { removeError } from '../../redux/actions/uiActions'

export const LoginScreen = ({ location }) => {

  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.ui)

  useEffect(() => {
    dispatch(removeError())
  }, [location, dispatch])

  const { values, handleInputChange } = useForm({
    email: 'example@gmail.com',
    password: '123456'
  })

  const { email, password } = values

  const handleLogin = (e) => {
    e.preventDefault()

    dispatch(startLoginEmailPassword(email, password))
  }

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin())
  }

  return (
    <div className="auth__form-container animate__animated animate__fadeIn">
      <h2 className="auth__title mb-5">
        Login
        <small className="auth__subtitle">
          or <Link to="/auth/register" className="link">Create new account</Link>
        </small>
      </h2>

      {error && (
        <div className="auth__alert-error animate__animated animate__fadeInDown">
          { error}
        </div>
      )}

      <form onSubmit={handleLogin}>

        <input
          autoComplete="off"
          type="text"
          name="email"
          placeholder="Email"
          className="auth__form-input"
          spellCheck="false"
          value={email}
          onChange={handleInputChange} />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="auth__form-input"
          value={password}
          onChange={handleInputChange} />

        <button disabled={loading} className="btn btn-primary btn-flex" type="submit">
          {loading && (<div className="lds-dual-ring mr-1"></div>)}
          Log In
        </button>

        <p className="line-with-text-dark mt-5">or</p>

        <div className="auth__social-networks">

          <div className="google-btn" onClick={handleGoogleLogin}>
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
