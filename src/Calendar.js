// Calendar.js
import React from 'react';
import "./Calendar.css";
import GridComponent from "./GridComponent.js";
import ClassesList from "./ClassesList.js";
import ElectivesList from "./ElectivesList.js";

const Calendar = () => {
  return (
    <div className="calendar">
      <div className="schedule-container">
        <GridComponent />
      </div>

      <div className="classes-list">
        <ClassesList />
      </div>

      <div className="electives-list">
        <ElectivesList />
      </div>
    </div>
  );
};

export default Calendar;