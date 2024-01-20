import './GridComponent.css';
import React, { useState } from 'react';

const texts = ['Text 1', 'Text 2', 'Text 3', 'Text 4', 'Text 5', 'Text 6'];
// const texts = [];

// for (let i = 1; i <= 20; i++) {
//   texts.push(`Text ${i}`);
// }

export default function GridComponent() {
    const [gridData, setGridData] = useState([[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);

    const handleDragStart = (e, rowIndex, colIndex) => {
        const text = gridData[rowIndex][colIndex];
        // Remove item from gridData
        const updatedGrid = [...gridData];
        updatedGrid[rowIndex].splice(colIndex, 1);
        setGridData(updatedGrid);

        e.dataTransfer.setData('text', text);
    };

    const handleDragOver = (e, rowIndex, colIndex) => {
        const text = gridData[rowIndex][colIndex];
        e.dataTransfer.setData('text', text);
    };
    const handleDrop = (e, rowIndex) => {
        e.preventDefault();
        const text = e.dataTransfer.getData('text');
        const sourceGrid = e.dataTransfer.getData('sourceGrid');
        const sourceRowIndex = parseInt(e.dataTransfer.getData('sourceRowIndex'), 10);
        const sourceColIndex = parseInt(e.dataTransfer.getData('sourceColIndex'), 10);
        const existingIndex = gridData[rowIndex].indexOf(text);
        if (existingIndex > -1) {
            //do nothing
            return;
        } //HELPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP!!!!!!!
        if (sourceGrid === 'currentGrid') {
            // Handle drop from the same grid
            const updatedGrid = [...gridData];
            // Re-insert the dragged text into the target grid cell
            updatedGrid[rowIndex].push(text);

            // If it's a move within the same row, handle removal from the source cell
            if (rowIndex === sourceRowIndex) {
                updatedGrid[sourceRowIndex].splice(sourceColIndex, 1);
            }
            setGridData(updatedGrid);
        } 
        else {// if (sourceGrid === 'otherGrid') {
            // Handle drop from another grid
            const updatedGrid = [...gridData];
            // Update the state of the target grid based on rowIndex
            updatedGrid[rowIndex].push(text);
            setGridData(updatedGrid);
        }
    };

    return (
        <div className="grid-container">
            {gridData.map((row, i) => (
                <div
                    key={i}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, i)}
                    className="grid-cell"
                >
                    {row.map((text, j) => (
                        <div
                            key={text}
                            onDragStart={(e) => handleDragStart(e, i, j)}
                            onDragOver={(e) => handleDragOver(e, i, j)}
                            draggable // Add draggable attribute
                        >
                            {text}
                        </div>
                    ))}
                </div>
            ))}

            {texts.map((text) => (
                <div
                    key={text}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text', text)}
                >
                    {text}
                </div>
            ))}
        </div>
    );
}