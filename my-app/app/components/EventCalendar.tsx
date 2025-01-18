'use client'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useState } from 'react'

export default function EventCalendar() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="calendar-container">
      <Calendar
        onChange={(value: Date) => setDate(value)}
        value={date}
        className="bg-gray-700 text-white border-0 rounded-lg"
      />
      <style jsx global>{`
        .react-calendar {
          background-color: transparent !important;
          border: none !important;
          width: 350px !important;
          max-width: 100% !important;
          line-height: 1.125em !important;
        }
        .react-calendar__tile {
          color: white !important;
          padding: 0.75em 0.5em !important;
        }
        .react-calendar__tile:enabled:hover {
          background-color: #4B5563 !important;
        }
        .react-calendar__tile--active {
          background-color: #7C3AED !important;
        }
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: #4B5563 !important;
        }
        .react-calendar__navigation button {
          color: white !important;
        }
      `}</style>
    </div>
  )
} 