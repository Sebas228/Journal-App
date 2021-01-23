import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useDispatch } from 'react-redux'

import { activeNote } from '../../redux/actions/notesActions'

dayjs.extend(relativeTime)

export const JournalEntry = ({ id, title, body, date, lastUpdate, url }) => {

  const dispatch = useDispatch()
  const noteDate = dayjs(date)

  const handleEntryClick = () => {
    dispatch(activeNote(id, { title, body, date, lastUpdate, url }))
  }

  return (
    <div onClick={handleEntryClick} className="journal__entry pointer animate__animated animate__fadeInDown">

      <div className="journal__entry-picture">
        <i className={`fas fa-image fa-2x ${url ? 'text-primary' : 'text-muted'}`}></i>
      </div>

      <div className="journal__entry-body">

        <p className={`journal__entry-title ${title ? '' : 'no-title'}`}>
          {title ? title : 'Your title here'}
        </p>

        <p className="journal__entry-last-update">
          Last update: {dayjs(lastUpdate).fromNow()}
        </p>
      </div>

      <div className="journal__date-box">
        <span>{noteDate.format('MMM')}</span>
        <h4>{noteDate.format('DD')}</h4>
      </div>

    </div>
  )
}
