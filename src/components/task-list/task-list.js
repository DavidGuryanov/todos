import React from "react";
import Task from "../task/task";
import "./task-list.css";
const TaskList = ({ tasks, onDelete, onMark }) => {
  const tasksList = tasks.map((item) => {
    return (
      <Task
        properties={item}
        key={item.id}
        onDelete={onDelete}
        onMark={onMark}
      />
    );
  });

  return <ul className="todo-list">{tasksList}</ul>;
};

export default TaskList;
