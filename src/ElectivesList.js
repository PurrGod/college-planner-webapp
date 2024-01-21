// ClassesList.js
import React from 'react';
import './ElectivesList.css'; // Import the CSS file

const electivesList = [];

for (let i = 1; i <= 70; i++) {
    electivesList.push(`Class ${i}`);
}

const ElectivesList = () => {
    const handleDragStart = (e, className) => {
        e.dataTransfer.setData("text", className);
        e.dataTransfer.setData("sourceGrid", "electives-list");
    };

    return (
        <div>
            <p>Electives</p>
            <div className="electives-list-section">
                {electivesList.map((className) => (
                    <div className="class"
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

export default ElectivesList;