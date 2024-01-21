import React, { useState } from "react";
import './GEList.css'; // Import the CSS file
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const my_GEs = ["CC","ER","IM","MF","SI","SR","TA","PE-E","PE-H","PE-T","PR-E","PR-C","PR-S","C1","C2"]
const geList = [];

for (let i = 0; i < my_GEs.length; i++) {
    geList.push(`${my_GEs[i]}`);
}

const GEList = () => {
    const [selectedClass, setSelectedClass] = useState(null);

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
      <p>GE's</p>
      <div className="ge-list-section">
        {geList.map((className) => (
          <Popup trigger={<div
            className="ge-class"
            key={className}
            draggable
            onDragStart={(e) => handleDragStart(e, className)}
            onClick={() => handleClassClick(className)}
          >
            {className}
          </div>} position="left center">
            <h2>{className}</h2>
            <div>ge You've gotta do dis</div>
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

export default GEList;