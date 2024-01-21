// Calendar.js

import React, { useState } from "react";
import "./Calendar.css";
import GridComponent from "./GridComponent.js";
import ClassesList from "./ClassesList.js";
import ElectivesList from "./ElectivesList.js";
import Search from "./Search.js";

const Calendar = () => {
  const [majorClasses, setMajorClasses] = useState([]);

  // Pass this function to Search.js to update majorClasses
  const updateMajorClasses = (data) => {
    setMajorClasses(data);
  };

  return (
    <div className="calendar">
      <Search updateMajorClasses={updateMajorClasses} />
      <div className="content-container">
        <div className="schedule-container">
          <GridComponent />
        </div>

        <div className="classes-list">
          {/* Pass majorClasses as a prop to ClassesList */}
          <ClassesList majorClasses={majorClasses} />
        </div>

        <div className="electives-list">
          <ElectivesList />
        </div>
      </div>
    </div>
  );
};

export default Calendar;