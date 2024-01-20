// calendar.js
import React, { useState } from "react";
import "./Calendar.css";
import GridComponent from "./GridComponent.js";

const Calendar = () => {
  return (
    <div className="calendar">
      <div className="schedule-container">
        <GridComponent />
      </div>

      <div className="classes-list">
        <p>classes go here :)</p>
      </div>

      <div className="electives">
        <p>electives go here</p>
      </div>
    </div>
  );
};

export default Calendar;
