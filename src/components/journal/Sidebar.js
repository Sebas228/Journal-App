import React from 'react'
import { useDispatch } from 'react-redux'

import { startLogout } from '../../redux/actions/authActions'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

  const dispatch = useDispatch()

  const handleLogout = () => dispatch(startLogout())

  return (
    <aside className="journal__sidebar">

      <div className="journal__sidebar-navbar mb-5">

        <h3>
          <i className="far fa-moon"></i>
          <span> Sebastian</span>
        </h3>

        <button onClick={handleLogout} className="btn btn-light journal__btn-logout">
          <i className="fas fa-sign-out-alt mr-1"></i>Logout
        </button>

      </div>

      <button className="btn btn-primary btn-block">
        <i className="fas fa-calendar-plus mr-1"></i>
         New Entry
      </button>

      <p className="line-with-text mt-5 mb-5">Entries</p>

      <JournalEntries />

    </aside>
  )
}
