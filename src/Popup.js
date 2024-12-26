import React, { useState } from "react";

const Popup = ({
  title,
  message,
  onConfirm,
  onCancel,
  showInput,
  defaultValue,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue || "");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirm = () => {
    if (showInput) {
      onConfirm(inputValue);
    } else {
      onConfirm();
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>{title}</h2>
        <p>{message}</p>
        {showInput && (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="popup-input"
            placeholder="Enter a name"
          />
        )}
        <div className="popup-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
