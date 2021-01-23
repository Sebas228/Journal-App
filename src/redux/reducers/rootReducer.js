import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { uiReducer } from './uiReducer'
import { notesReducer } from './notesReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer
})

export default rootReducer