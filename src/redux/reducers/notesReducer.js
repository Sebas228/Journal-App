import { types } from "../../types/types"

const initialState = {
  loading: false,
  loadingFile: false,
  fileError: null,
  deleting: false,
  notes: [],
  active: {
    isSaving: false,
    hasError: null,
    note: null
  }
}

export const notesReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case types.notesActive:
      return { ...state, active: { ...state.active, note: { ...payload } } }

    case types.notesAddNew:
      return { ...state, notes: [payload, ...state.notes] }

    case types.notesStartLoading:
      return { ...state, loading: true }

    case types.notesLoad:
      return { ...state, notes: [...payload] }

    case types.notesFinishLoading:
      return { ...state, loading: false }

    case types.notesStartSavingNote:
      return { ...state, active: { ...state.active, loading: true, hasError: null } }

    case types.notesFinishSavingNote:
      return { ...state, active: { ...state.active, loading: false } }

    case types.notesSetError:
      return { ...state, active: { ...state.active, hasError: payload } }

    case types.notesRemoveError:
      return { ...state, active: { ...state.active, hasError: null } }

    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === payload.id
            ? payload.note
            : note
        )
      }

    case types.notesStartLoadingUpload:
      return { ...state, loadingFile: true }

    case types.notesFinishLoadingUpload:
      return { ...state, loadingFile: false }

    case types.notesUploadSetError:
      return { ...state, fileError: payload }

    case types.notesUploadRemoveError:
      return { ...state, fileError: null }

    case types.notesDelete:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== payload),
        active: { ...state.active, note: null }
      }

    case types.notesDeletingNote:
      return { ...state, deleting: payload }

    case types.notesLogoutCleaning:
      return { ...initialState }

    default:
      return state
  }

}