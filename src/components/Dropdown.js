import { useState } from "react";

function Dropdown({ selected, setDiff }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => setIsExpanded(!isExpanded);

  return (
    <div className="dropdown">
      <div className="dropdown-title" onClick={toggleMenu}>
        {selected}{" "}
        <i className={`fa fa-angle-right ${isExpanded ? "rotated" : ""}`}></i>
      </div>
      <div className={`dropdown-menu ${!isExpanded ? "hidden" : ""}`}>
        <div
          className="option"
          onClick={() => {
            setDiff("e");
            setIsExpanded(false);
          }}
        >
          Easy
        </div>
        <div
          className="option"
          onClick={() => {
            setDiff("m");
            setIsExpanded(false);
          }}
        >
          Medium
        </div>
        <div
          className="option"
          onClick={() => {
            setDiff("h");
            setIsExpanded(false);
          }}
        >
          Hard
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
