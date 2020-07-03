import React from "react";
import PropTypes from "prop-types";

import "./task-filter.css";

function changeSelectedClass(e) {
  let buttonsArray = document.querySelectorAll(".filters li button");
  buttonsArray.forEach(function (el) {
    if (el !== e.target && el.classList.contains("selected")) {
      el.classList.remove("selected");
    } else if (el === e.target && !el.classList.contains("selected")) {
      el.classList.add("selected");
    }
  });
}
function filter(changeClassFunc, filterFunc) {
  filterFunc();
}
const TaskFilter = ({ filterCompleted, filterActive, filterAll }) => {
  return (
    <ul className="filters">
      <li>
        <button
          className="selected"
          onClick={(e) => filter(changeSelectedClass(e), filterAll)}
        >
          All
        </button>
      </li>
      <li>
        <button onClick={(e) => filter(changeSelectedClass(e), filterActive)}>
          Active
        </button>
      </li>
      <li>
        <button
          onClick={(e) => filter(changeSelectedClass(e), filterCompleted)}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};
TaskFilter.defaultProps = {
  filterCompleted: () => {},
  filterActive: () => {},
  filterAll: () => {},
  removeCompleted: () => {},
};
TaskFilter.propTypes = {
  filterCompleted: PropTypes.func,
  filterActive: PropTypes.func,
  filterAll: PropTypes.func,
  removeCompleted: PropTypes.func,
};
export default TaskFilter;
