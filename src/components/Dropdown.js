import { useState } from "react";

function Dropdown({ selected, setDiff, labels }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const options = Object.keys(labels).map((key) => (
    <div
      className="option"
      onClick={() => {
        setDiff(key);
        setIsExpanded(false);
      }}
      key={key}
    >
      {labels[key]}
    </div>
  ));
  const toggleMenu = () => setIsExpanded(!isExpanded);

  return (
    <div className="dropdown">
      <div className="dropdown-title" onClick={toggleMenu}>
        {selected}{" "}
        <i className={`fa fa-angle-right ${isExpanded ? "rotated" : ""}`}></i>
      </div>
      <div className={`dropdown-menu ${!isExpanded ? "hidden" : ""}`}>
        {options}
      </div>
    </div>
  );
}

export default Dropdown;
