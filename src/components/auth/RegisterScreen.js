import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'

import { useForm } from '../../hooks/useForm'
import { startRegisterWithEmailPasswordName } from '../../redux/actions/authActions'
import { removeError, setError } from '../../redux/actions/uiActions'

export const RegisterScreen = ({ location }) => {

  const dispatch = useDispatch()
  const { error, loading } = useSelector(state => state.ui)

  useEffect(() => {
    dispatch(removeError())
  }, [location, dispatch])

  const { values, handleInputChange } = useForm({
    username: 'Sofia Rodriguez',
    email: 'example@gmail.com',
    password: '123456',
    password2: '123456'
  })

  const { username, email, password, password2 } = values

  const handleRegister = (e) => {
    e.preventDefault()

    if (isValidForm()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, username))
    }

  }

  const isValidForm = () => {

    if (username.trim().length < 4) {
      dispatch(setError('The username must be contain at least 4 chars'))
      return false
    } else if (!validator.isEmail(email)) {
      dispatch(setError('The email is invalid'))
      return false
    } else if (password !== password2) {
      dispatch(setError('The passwords doesn\'t match'))
      return false
    } else if (password.length < 5) {
      dispatch(setError('The password canno\'t be empty'))
      return false
    }

    dispatch(removeError())

    return true
  }

  return (
    <div className="auth__form-container animate__animated animate__fadeIn">
      <h2 className="auth__title mb-5">
        Register
        <small className="auth__subtitle">
          or <Link to="/auth/login" className="link">Sign in</Link>
        </small>
      </h2>

      {error && (
        <div className="auth__alert-error animate__animated animate__fadeInDown">
          { error}
        </div>
      )}

      <form onSubmit={handleRegister}>

        <input
          autoComplete="off"
          type="text"
          name="username"
          placeholder="Username"
          className="auth__form-input"
          spellCheck="false"
          value={username}
          onChange={handleInputChange} />

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

        <input
          type="password"
          name="password2"
          placeholder="Password confirm"
          className="auth__form-input"
          value={password2}
          onChange={handleInputChange} />

        <button disabled={loading} className="btn btn-primary btn-flex mb-5" type="submit">
          {loading && (<div className="lds-dual-ring mr-1"></div>)}
          Create account
        </button>

      </form>
    </div>
  )
}
