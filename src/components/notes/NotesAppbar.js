import React from 'react'

export const NotesAppbar = () => {
  return (
    <div className="notes__appbar">
      <span>21 de enero 2021</span>

      <div>
        <button className="btn btn-dark">
          <i className="fas fa-file-upload mr-1"></i>Upload a picture
        </button>

        <button className="btn btn-primary">
          <i className="fas fa-save mr-1"></i>Save
        </button>

        <button className="btn btn-warning">
          <i className="fas fa-trash-alt mr-1"></i>Delete
        </button>
      </div>

    </div>
  )
}
