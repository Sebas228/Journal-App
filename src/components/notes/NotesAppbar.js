import React, { useRef } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useDispatch, useSelector } from 'react-redux'
import { startDeletingNote, startFileUpload, startSaveNote } from '../../redux/actions/notesActions'

dayjs.extend(localizedFormat)

export const NotesAppbar = ({ dateCreation }) => {

  const date = dayjs(dateCreation)

  const inputRef = useRef(null)

  const dispatch = useDispatch()
  const { active: { note, loading, hasError } } = useSelector(state => state.notes)

  const handleSaveNote = () => {
    dispatch(startSaveNote(note))
  }

  const handlePictureClick = () => inputRef.current.click()

  const handleFileChange = ({ target }) => {
    const file = target.files[0]

    if (file) {
      dispatch(startFileUpload(file))
      inputRef.current.value = null
    }
  }

  const handleDelete = () => {
    dispatch(startDeletingNote(note.id))
  }

  return (

    <div className="notes__appbar">

      {loading && (<div className="ui__backdrop-screen"></div>)}

      <span>{date.format('LL')}</span>

      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange} />

      <div className="notes__saving-message">
        {loading && (
          <><p className="mr-1">Saving Note</p> <div className="lds-dual-ring mr-1"></div></>
        )}

        {hasError && (
          <p className="error-saving-note">{hasError}</p>
        )}
      </div>

      <div>
        <button className="btn btn-dark" onClick={handlePictureClick}>
          <i className="fas fa-file-upload mr-1"></i>Upload a picture
        </button>

        <button className="btn btn-primary" onClick={handleSaveNote}>
          <i className="fas fa-save mr-1"></i>Save
        </button>

        <button className="btn btn-warning" onClick={handleDelete}>
          <i className="fas fa-trash-alt mr-1"></i>Delete
        </button>
      </div>

    </div>
  )
}
