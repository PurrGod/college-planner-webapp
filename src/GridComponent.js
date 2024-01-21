// GridComponent.js
import "./GridComponent.css";
import React, { useState } from "react";

function GridComponent() {
  const quarters = ["Fall", "Winter", "Spring", "Summer"];
  const years = ["1st year", "2nd year", "3rd year", "4th year"];

  const [gridData, setGridData] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const handleDragStart = (e, rowIndex, cellIndex) => {
    e.dataTransfer.setData("text", gridData[rowIndex][cellIndex]);
    e.dataTransfer.setData("sourceGrid", "grid");
  };

  const handleDragOver = (e, rowIndex) => {
    e.preventDefault();
  };

  const handleDrop = (e, rowIndex) => {
    e.preventDefault();

    const draggedText = e.dataTransfer.getData("text");
    const sourceGrid = e.dataTransfer.getData("sourceGrid");

    if (sourceGrid === "grid") {
      // Handle drop within the grid
      const updatedGridData = [...gridData];
      updatedGridData[rowIndex] = updatedGridData[rowIndex].map((text, j) =>
        j === rowIndex ? draggedText : text
      );
      setGridData(updatedGridData);
    } else if (sourceGrid === "classes-list") {
      // Handle drop from classes list to grid
      const updatedGridData = [...gridData];
      updatedGridData[rowIndex].push(draggedText);
      setGridData(updatedGridData);
    }
  };

  return (
    <div className="schedule-wrapper">
      <div className="section1">
        <div className="year-bar">
          {years.map((year, index) => (
            <div key={index} className="year-label">
              {year}
            </div>
          ))}
        </div>
      </div>

      <div className="section2">
        <div className="column-title-container">
          {quarters.map((quarter, index) => (
            <React.Fragment key={index}>
              <div className="quarter-bar-item">{quarter}</div>
            </React.Fragment>
          ))}
        </div>

        <div className="grid-container">
          {gridData.map((row, i) => (
            <div
              key={i}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={(e) => handleDrop(e, i)}
              className="grid-cell"
            >
              {row.map((text, j) => (
                <div
                  key={text}
                  onDragStart={(e) => handleDragStart(e, i, j)}
                  draggable
                >
                  {text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GridComponent;