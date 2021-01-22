import { types } from "../../types/types";
import { firebase, googleAuthProvider } from '../../firebase/firebase-config'

import { setError, uiFinishLoading, uiStartLoading } from "./uiActions";

export const startRegisterWithEmailPasswordName = (email, password, username) => async dispatch => {

  try {
    dispatch(uiStartLoading())

    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await user.updateProfile({ displayName: username })

    dispatch(login(user.uid, user.displayName))

  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(uiFinishLoading())
  }

}

export const startLoginEmailPassword = (email, password) => async dispatch => {

  try {

    dispatch(uiStartLoading())

    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password)

    dispatch(login(user.uid, user.displayName))

  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(uiFinishLoading())
  }

}

export const startGoogleLogin = () => async dispatch => {

  const { user } = await firebase.auth().signInWithPopup(googleAuthProvider)

  dispatch(login(user.uid, user.displayName))

}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: { uid, displayName }
})

export const startLogout = () => async dispatch => {

  try {

    await firebase.auth().signOut()

    dispatch(logout())

  } catch (error) {
    console.log(error)
  }

}

export const logout = () => ({
  type: types.logout
})