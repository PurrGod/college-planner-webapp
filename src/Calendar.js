// calendar.js
import React, { useState } from "react";
import "./Calendar.css"; // Import the CSS file for styling if needed

const Calendar = () => {
  const [draggedItem, setDraggedItem] = useState(null);

  const calendarData = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
    "Item 16",
  ];

  const handleDragStart = (event, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    console.log(`Dropped ${draggedItem} at index ${targetIndex}`);
    setDraggedItem(null);
  };

  return (
    <div className="calendar">
      <div className="grid-container">
        {calendarData.map((item, index) => (
          <div
            key={index}
            className="grid-item"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDrop={(event) => handleDrop(event, index)}
          >
            {draggedItem && index === calendarData.indexOf(draggedItem) && (
              <div className="dragged-item">{draggedItem}</div>
            )}
          </div>
        ))}
      </div>

      <div className="draggable-items">
        {calendarData.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={(event) => handleDragStart(event, item)}
            className="draggable-item"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
