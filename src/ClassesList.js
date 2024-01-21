// ClassesList.js

import React, { useEffect, useState } from "react";
import "./ClassesList.css"; // Import the CSS file

const ClassesList = ({ majorClasses }) => {
  const [localMajorClasses, setLocalMajorClasses] = useState([]);

  useEffect(() => {
    // Update local state when majorClasses prop changes
    setLocalMajorClasses(majorClasses ?? []);
  }, [majorClasses]);

  const handleDragStart = (e, className) => {
    e.dataTransfer.setData("text", className);
    e.dataTransfer.setData("sourceGrid", "classes-list");
  };

  return (
    <div>
      <p>Major Reqs</p>
      <div className="classes-list-section">
        {localMajorClasses.map((className) => (
          <div
            className="c-class"
            key={className}
            draggable
            onDragStart={(e) => handleDragStart(e, className)}
          >
            {className}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesList;
