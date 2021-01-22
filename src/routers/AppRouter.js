import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { firebase } from '../firebase/firebase-config'

import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { login } from '../redux/actions/authActions'
import { LoadingScreen } from '../components/ui/LoadingScreen'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {

  const [checkin, setCheckin] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {

      if (user?.uid) {
        dispatch(login(user.uid, user.displayName))
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }

      setCheckin(false)

    })

  }, [dispatch, setCheckin, setIsLoggedIn])

  if (checkin) return <LoadingScreen />

  return (
    <Router>

      <div>
        <Switch>

          <PublicRoute
            isAuthenticated={isLoggedIn}
            path="/auth"
            component={AuthRouter} />

          <PrivateRoute
            isAuthenticated={isLoggedIn}
            path="/"
            exact
            component={JournalScreen} />

          <Redirect to="/auth/login" />

        </Switch>
      </div>

    </Router>
  )
}
