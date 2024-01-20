import React, { useState } from "react";
import "./Bar.css";
import Popup from "./popup.js";

const Bar = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleLoginClick = () => {
    setShowPopup(true);
  };

  const handleSignupClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bar">
      <p className="top-text">UCSC Major Classes Planner</p>

      <button onClick={handleLoginClick}>Log In</button>
      <button className="signup-btn" onClick={handleSignupClick}>
        Sign Up
      </button>

      {showPopup && <Popup onClose={handleClosePopup} />}
    </div>
  );
};

export default Bar;
