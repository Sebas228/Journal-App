import React from 'react'

export const LoadingScreen = () => {
  return (
    <div className="ui__loading-screen animate__animated animate__fadeIn">
      <h1 className="mb-1">JOURNAL APP</h1>
      <h2>Loading <div className="lds-dual-ring mr-1"></div></h2>

      <div className="mt-5">
        <i className="fas fa-hiking mr-1 fa-5x"></i>
        <i className="fas fa-mountain fa-5x"></i>
      </div>
    </div>
  )
}
