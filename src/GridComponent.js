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

  const handleDeleteItem = (rowIndex, item) => {
    const updatedGridData = [...gridData];
    updatedGridData[rowIndex] = updatedGridData[rowIndex].filter(
      (existingItem) => existingItem !== item
    );
    setGridData(updatedGridData);
  };

  const handleDrop = (e, rowIndex) => {
    e.preventDefault();

    const draggedText = e.dataTransfer.getData("text");
    const sourceGrid = e.dataTransfer.getData("sourceGrid");

    // Check if the drop is triggered by a double-click
    if (e.detail === 2) {
      const updatedGridData = [...gridData];
      updatedGridData[rowIndex] = updatedGridData[rowIndex].filter(
        (item) => item !== draggedText
      );
      setGridData(updatedGridData);
    } else {
      // Handle regular drop logic
      const updatedGridData = [...gridData];
      const isItemInDestination =
        updatedGridData[rowIndex].includes(draggedText);

      if (!isItemInDestination) {
        updatedGridData.forEach((row, i) => {
          const indexOfDraggedItem = row.indexOf(draggedText);
          if (indexOfDraggedItem !== -1) {
            updatedGridData[i].splice(indexOfDraggedItem, 1);
          }
        });
        updatedGridData[rowIndex].push(draggedText);
        setGridData(updatedGridData);
      }
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
                  onDoubleClick={() => handleDeleteItem(i, text)} // Add this line
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
