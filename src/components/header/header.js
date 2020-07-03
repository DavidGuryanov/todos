import React from "react";
import NewTaskForm from "../newTaskForm/new-task-form";
import PropTypes from "prop-types";

import "./header.css";

const Header = ({ onNewTask }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onNewTask={onNewTask} />
    </header>
  );
};

Header.defaultProps = {
  onNewTask: () => {},
};
Header.propTypes = {
  onNewTask: PropTypes.func,
};
export default Header;
