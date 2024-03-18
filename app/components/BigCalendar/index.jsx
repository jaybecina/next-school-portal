"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Popover, Button } from "antd";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ data }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopover = () => {
    setSelectedEvent(null);
  };

  const content = (selectedEvent) => (
    <div className="p-4">
      <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
      <p className="text-gray-600">{selectedEvent.desc}</p>
      <p className="text-sm text-gray-500">
        Start: {selectedEvent.start.toString()}
      </p>
      <p className="text-sm text-gray-500">
        End: {selectedEvent.end.toString()}
      </p>
      <Button onClick={handleClosePopover}>Close</Button>
    </div>
  );

  return (
    <div className="h-[700px] w-full p-4">
      <Calendar
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
      />
      {selectedEvent && (
        <Popover
          placement="top"
          title=""
          content={content(selectedEvent)}
          visible={selectedEvent !== null}
          trigger="click"
          onClose={handleClosePopover}
        >
          <div></div>
        </Popover>
      )}
    </div>
  );
};

export default BigCalendar;
