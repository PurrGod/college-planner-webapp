// Calendar.js

import React, { useState } from "react";
import "./Calendar.css";
import GridComponent from "./GridComponent.js";
import ClassesList from "./ClassesList.js";
import GEList from "./GEList.js";
import Search from "./Search.js";

const Calendar = () => {
  const [majorClasses, setMajorClasses] = useState([]);

  const updateMajorClasses = (data) => {
    setMajorClasses(data);
  };

  return (
    <div className="calendar">
      <div className="container1">
        <div className="Search">
          <Search updateMajorClasses={updateMajorClasses} />
        </div>

        <div className="schedule-container">
          <GridComponent />
        </div>
      </div>
      <div className="container2">
        <div className="classes-list">
          <ClassesList majorClasses={majorClasses} />
        </div>

        <div className="ge-list">
          <GEList />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
