import React from "react";
import "./optionButtons.scss";
const Buttons = () => {
  return (
    <div className="options_buttons">
      <button>
        <i className="fas fa-plus fa-3x"></i>Code
      </button>
      <button>
        <i className="fas fa-plus fa-3x"></i>Text
      </button>
    </div>
  );
};

export default Buttons;
