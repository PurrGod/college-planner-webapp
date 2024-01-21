// GridComponent.js
import "./GridComponent.css";
import React, { useState } from "react";

const texts = ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5", "Text 6"];
const initialClasses = ["Class A", "Class B", "Class C"];

function GridComponent() {
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

  const handleDragStart = (e, rowIndex, colIndex) => {
    const text = gridData[rowIndex][colIndex];
    // Remove item from gridData
    const updatedGrid = [...gridData];
    updatedGrid[rowIndex].splice(colIndex, 1);
    setGridData(updatedGrid);

    e.dataTransfer.setData("text", text);
    e.dataTransfer.setData("sourceGrid", "currentGrid");
    e.dataTransfer.setData("sourceRowIndex", rowIndex.toString());
    e.dataTransfer.setData("sourceColIndex", colIndex.toString());
  };

  const handleDragOver = (e, rowIndex, colIndex) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text");
    e.dataTransfer.setData("text", text);
  };

  const handleDrop = (e, rowIndex) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text");
    const sourceGrid = e.dataTransfer.getData("sourceGrid");
    const sourceRowIndex = parseInt(
      e.dataTransfer.getData("sourceRowIndex"),
      10
    );
    const sourceColIndex = parseInt(
      e.dataTransfer.getData("sourceColIndex"),
      10
    );

    if (sourceGrid === "currentGrid") {
      // Handle drop from the same grid
      const updatedGrid = [...gridData];
      // Re-insert the dragged text into the target grid cell
      updatedGrid[rowIndex].push(text);

      // If it's a move within the same row, handle removal from the source cell
      if (rowIndex === sourceRowIndex) {
        updatedGrid[sourceRowIndex].splice(sourceColIndex, 1);
      }
      setGridData(updatedGrid);
    } else {
      // Handle drop from classes-list
      const updatedGrid = [...gridData];
      updatedGrid[rowIndex].push(text);
      setGridData(updatedGrid);
    }
  };

  return (
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

      {initialClasses.map((className) => (
        <div
          key={className}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("text", className);
            e.dataTransfer.setData("sourceGrid", "classes-list");
          }}
        >
          {className}
        </div>
      ))}
    </div>
  );
}

export default GridComponent;
