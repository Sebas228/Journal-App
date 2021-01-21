import React from 'react'
import { NotesAppbar } from './NotesAppbar'

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">

      <NotesAppbar />

      <div className="notes__content">

        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          spellCheck="false"
          autoComplete="off" />

        <textarea
          placeholder="What happended today"
          className="notes__textarea"
          spellCheck="false"></textarea>

        <div className="notes__image">
          <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" alt="image uploaded" />
        </div>

      </div>

    </div>
  )
}
