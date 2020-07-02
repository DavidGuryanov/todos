import React from "react";
import TaskFilter from "../task-filter/task-filter";

import "./footer.css";

const Footer = ({
  itemsLeft,
  filterCompleted,
  filterActive,
  filterAll,
  removeCompleted,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TaskFilter
        filterCompleted={filterCompleted}
        filterActive={filterActive}
        filterAll={filterAll}
      />
      <button className="clear-completed" onClick={removeCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
