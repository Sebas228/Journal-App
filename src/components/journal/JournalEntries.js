import React from 'react'
import { useSelector } from 'react-redux'

import { JournalEntry } from './JournalEntry'

export const JournalEntries = () => {

  const { notes, loading } = useSelector(state => state.notes)

  return (
    <div className="journal__entries">

      {loading && (
        <div className="journal__loading-notes">
          <h4 className="mr-1">Loading notes</h4> <div className="lds-dual-ring mr-1"></div>
        </div>
      )}

      {
        notes.map(note => (
          <JournalEntry key={note.id} {...note} />
        ))
      }
    </div>
  )
}
