import React from "react";
import PropTypes from "prop-types";
import Task from "../task/task";

import "./task-list.css";

const TaskList = ({ tasks, onDelete, onChange, onMark }) => {
  const tasksList = tasks.map((item) => {
    return (
      <Task
        properties={item}
        key={item.id}
        onDelete={onDelete}
        onChange={onChange}
        onMark={onMark}
      />
    );
  });

  return <ul className="todo-list">{tasksList}</ul>;
};

TaskList.defaultProps = {
  onDelete: () => {},
  onChange: () => {},
  onMark: () => {},
};
TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
  onMark: PropTypes.func,
};

export default TaskList;
