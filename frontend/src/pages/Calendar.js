import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Enables drag & drop for events

const Calendar = () => {
  const [events, setEvents] = useState([
    // Sample events, these can be fetched from your backend
    { title: 'Breakfast', date: '2025-02-03' },
    { title: 'Lunch', date: '2025-02-04' },
  ]);

  // Function to handle event clicks (show event details)
  const handleEventClick = (info) => {
    alert('Event: ' + info.event.title);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meal Schedule Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick} // Handles clicks on events
        dateClick={(info) => alert('Clicked on: ' + info.dateStr)} // Handles date clicks
      />
    </div>
  );
};

export default Calendar;
