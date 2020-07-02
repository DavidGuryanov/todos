import React from "react";
import NewTaskForm from "../newTaskForm/new-task-form";
import "./header.css";
const Header = ({ onNewTask }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onNewTask={onNewTask} />
    </header>
  );
};
export default Header;
