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

      <button className="login-btn" onClick={handleLoginClick}>
        <span>
          Log In
        </span>
      </button>
      <button className="signup-btn" onClick={handleSignupClick}>
        <span>
          Sign Up
        </span>
      </button>

      {showPopup && <Popup onClose={handleClosePopup} />}
    </div>
  );
};

export default Bar;
