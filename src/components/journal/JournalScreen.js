import React from 'react'
import { useSelector } from 'react-redux'

import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from '../journal/NothingSelected'
import { Sidebar } from './Sidebar'
import { FileUploadModal } from '../ui/FileUploadModal'

export const JournalScreen = () => {

  const { active: { note }, loadingFile, fileError, deleting } = useSelector(state => state.notes)

  return (
    <>
      {loadingFile && (
        <FileUploadModal message={<><h2>Uploading file <div className="lds-dual-ring mr-1"></div></h2></>} />
      )}

      {fileError && (<FileUploadModal message={<p>{fileError}</p>} />)}

      {deleting && (
        <FileUploadModal message={<><h2>Deleting note <div className="lds-dual-ring mr-1"></div></h2></>} />
      )}

      <div className="journal__main-content">
        <Sidebar />

        <main>
          {
            (note)
              ? (<NoteScreen />)
              : (<NothingSelected />)
          }
        </main>

      </div>
    </>
  )
}
