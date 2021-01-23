import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm } from '../../hooks/useForm'
import { activeNote, notesRemoveError } from '../../redux/actions/notesActions'

import { NotesAppbar } from './NotesAppbar'

export const NoteScreen = () => {

  let timeout = useRef(null)

  const dispatch = useDispatch()

  const { active: { note } } = useSelector(state => state.notes)

  const { values: formValues, handleInputChange, reset } = useForm(note)

  const { title, body } = formValues

  const activeId = useRef(note.id)

  useEffect(() => {

    if (note.id !== activeId.current) {
      reset(note)

      activeId.current = note.id
      dispatch(notesRemoveError())
    }

  }, [note, reset, dispatch])

  const handleUserOutKeyboard = () => {

    clearInterval(timeout.current)

    timeout.current = setInterval(() => {
      clearInterval(timeout.current)
      dispatch(activeNote(note.id, { ...formValues }))
    }, 500)

  }

  return (
    <div className="notes__main-content">

      <NotesAppbar dateCreation={note.date} />

      <div className="notes__content">

        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          spellCheck="false"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleInputChange}
          onKeyUp={handleUserOutKeyboard} />

        <textarea
          placeholder="What happended today"
          className="notes__textarea"
          spellCheck="false"
          name="body"
          value={body}
          onChange={handleInputChange}
          onKeyUp={handleUserOutKeyboard}></textarea>

        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt={title} />
          </div>
        )}

      </div>

    </div>
  )
}
