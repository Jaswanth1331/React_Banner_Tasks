// src/Components/ToggleSwitch.js
import React from 'react';
import './ToggleSwitch.css'; // Import the CSS file

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <div className="love">
      <input
        id="switch"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label className="love-heart" htmlFor="switch">
        <i className="left"></i>
        <i className="right"></i>
        <i className="bottom"></i>
        <div className="round"></div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
