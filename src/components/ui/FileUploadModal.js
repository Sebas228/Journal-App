import React from 'react'

export const FileUploadModal = ({ message }) => {
  return (
    <div className="file-upload-screen animate__animated animate__fadeIn animate__fast">

      <div className="file-upload-box">
        <div className="file-upload-title">
          <h5 className="">JOURNAL APP</h5>
        </div>

        {message}
      </div>

    </div>
  )
}
