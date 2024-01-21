// ClassesList.js
import React from 'react';

const classesList = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6"];

const ClassesList = () => {
  const handleDragStart = (e, className) => {
    e.dataTransfer.setData("text", className);
    e.dataTransfer.setData("sourceGrid", "classes-list");
  };

  return (
    <div>
      <p>Classes go here :)</p>
      {classesList.map((className) => (
        <div
          key={className}
          draggable
          onDragStart={(e) => handleDragStart(e, className)}
        >
          {className}
        </div>
      ))}
    </div>
  );
};

export default ClassesList;
