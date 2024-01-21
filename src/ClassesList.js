// ClassesList.js

import React, { useEffect, useState } from "react";
import "./ClassesList.css"; // Import the CSS file
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ClassesList = ({ majorClasses }) => {
  const [localMajorClasses, setLocalMajorClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    // Update local state when majorClasses prop changes
    setLocalMajorClasses(majorClasses ?? []);
  }, [majorClasses]);

  const handleDragStart = (e, className) => {
    e.dataTransfer.setData("text", className);
    e.dataTransfer.setData("sourceGrid", "classes-list");
  };

  const handleClassClick = (className) => {
    // Toggle selection if the same class is clicked again
    setSelectedClass((prevSelectedClass) =>
      prevSelectedClass === className ? null : className
    );
  };

  const handleClosePopup = () => {
    setSelectedClass(null);
  };

  return (
    <div>
      <p>Major Reqs</p>
      <div className="classes-list-section">
        {localMajorClasses.map((className) => (
          <Popup trigger={<div
            className="c-class"
            key={className}
            draggable
            onDragStart={(e) => handleDragStart(e, className)}
            onClick={() => handleClassClick(className)}
          >
            {className}
          </div>} position="left center">
            <h2>{className}</h2>
            <div>You've gotta do dis</div>
          </Popup>
        ))}
      </div>
      {selectedClass && (
        <Popup
          className={selectedClass}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default ClassesList;
