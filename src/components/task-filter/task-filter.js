import React from "react";
import "./task-filter.css";
function changeClass(e) {
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
          onClick={(e) => filter(changeClass(e), filterAll)}
        >
          All
        </button>
      </li>
      <li>
        <button onClick={(e) => filter(changeClass(e), filterActive)}>
          Active
        </button>
      </li>
      <li>
        <button onClick={(e) => filter(changeClass(e), filterCompleted)}>
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TaskFilter;
