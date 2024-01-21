import React, { useEffect, useState } from "react";
import "./ClassesList.css"; // Import the CSS file
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ClassesList = ({ majorClasses }) => {
  const [localMajorClasses, setLocalMajorClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate asynchronous data fetching
    setTimeout(() => {
      // Update local state when majorClasses prop changes
      setLocalMajorClasses(majorClasses ?? []);
      setIsLoading(false); // Set loading state to false after data is fetched
    }, 1000); // Adjust the timeout as needed
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
      <div className="classes-list-section">
        {isLoading && (
          <div className="test">
            <iframe
              title="Giphy Embed"
              src="https://giphy.com/embed/g5FB33d3GVUkg"
              className="gif"
            ></iframe>
            <p>Loading...</p>
          </div>
        )}
        {!isLoading &&
          localMajorClasses.map((className) => (
            <div key={className} className="class-wrapper">
              <Popup
                trigger={
                  <div
                    className="c-class"
                    draggable
                    onDragStart={(e) => handleDragStart(e, className)}
                    onClick={() => handleClassClick(className)}
                  >
                    {className}
                  </div>
                }
                position="left center"
              >
                <h2>{className}</h2>
                <div>You've gotta do dis</div>
              </Popup>
            </div>
          ))}
      </div>
      {selectedClass && (
        <Popup className={selectedClass} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default ClassesList;
