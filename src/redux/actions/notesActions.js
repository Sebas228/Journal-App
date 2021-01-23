import { db } from "../../firebase/firebase-config"
import { fileUpload } from "../../helpers/fileUpload"

import { loadNotes } from "../../helpers/loadNotes"
import { types } from "../../types/types"

export const startNewNote = () => async (dispatch, getState) => {

  const { uid } = getState().auth

  const newNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
    lastUpdate: new Date().getTime()
  }

  try {
    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote)
    dispatch(activeNote(docRef.id, newNote))

    dispatch(addNewNote(docRef.id, newNote))
  } catch (error) {
    console.log(error)
  }

}

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: { id, ...note }
})

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, ...note }
})

export const startLoadingNotes = (uid) => async dispatch => {

  dispatch(changeLoadingNotes(true))

  const notes = await loadNotes(uid)

  dispatch(setNotes(notes))

  dispatch(changeLoadingNotes(false))
}

export const changeLoadingNotes = (param) => ({
  type: (param) ? types.notesStartLoading : types.notesFinishLoading
})

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})

export const startSaveNote = (note) => async (dispatch, getState) => {

  dispatch({ type: types.notesStartSavingNote })

  try {

    const { uid } = getState().auth

    const noteToFirestore = { ...note, lastUpdate: new Date().getTime() }
    delete noteToFirestore.id

    if (!note.url) {
      delete noteToFirestore.url
    }

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)

    dispatch(refreshNote(note.id, noteToFirestore))

  } catch (error) {

    dispatch({
      type: types.notesSetError,
      payload: 'An error has ocurred when try to update the note, please try it again later'
    })

  } finally {

    dispatch({ type: types.notesFinishSavingNote })

  }
}

export const notesRemoveError = () => ({
  type: types.notesRemoveError
})

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: { id, note: { id, ...note } }
})

export const startFileUpload = (file) => async (dispatch, getState) => {

  dispatch({ type: types.notesStartLoadingUpload })

  const { active: { note } } = getState().notes

  try {
    const fileUrl = await fileUpload(file)
    note.url = fileUrl

    dispatch(startSaveNote(note))

  } catch (error) {

    dispatch({ type: types.notesUploadSetError, payload: 'An error has ocurred when try to upload the file' })

    setTimeout(() => {
      dispatch({ type: types.notesUploadRemoveError })
    }, 4000)

  } finally {
    dispatch({ type: types.notesFinishLoadingUpload })
  }

}

export const startDeletingNote = (id) => async (dispatch, getState) => {

  dispatch({ type: types.notesDeletingNote, payload: true })

  const { uid } = getState().auth

  await db.doc(`${uid}/journal/notes/${id}`).delete()

  dispatch(deleteNote(id))

  dispatch({ type: types.notesDeletingNote, payload: false })
}

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id
})

export const notesLogout = () => ({
  type: types.notesLogoutCleaning
})