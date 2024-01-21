// ClassesList.js
import React from "react";
import "./ClassesList.css"; // Import the CSS file

const classesList = [];

for (let i = 1; i <= 70; i++) {
  classesList.push(`Class ${i}`);
}

const ClassesList = () => {
  const handleDragStart = (e, className) => {
    e.dataTransfer.setData("text", className);
    e.dataTransfer.setData("sourceGrid", "classes-list");
  };

  return (
    <div>
      <p>Classes go here :)</p>
      <div className="classes-list-section">
        {classesList.map((className) => (
          <div
            className="class"
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
