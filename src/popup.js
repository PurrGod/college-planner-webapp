import React from "react";
import "./popup.css";

const Popup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {/* Add your login or sign-up form or content here */}
        <p>This is the pop-up content.</p>
      </div>
    </div>
  );
};

export default Popup;
