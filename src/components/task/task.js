import React, { Component } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "./task.css";

export default class Task extends Component {
  render() {
    const { properties, onDelete, onMark } = this.props;
    const { status: tasktype, description, created, id, hidden } = properties;
    const time = formatDistanceToNow(created, {
      addSuffix: true,
      includeSeconds: true,
    });
    const liClasses = `${tasktype} ${hidden ? "hidden" : ""}`;
    return (
      <li className={liClasses}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            defaultChecked={tasktype === "completed" ? true : false}
            onClick={() => onMark(id)}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">created {time}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button
            className="icon icon-destroy"
            onClick={() => onDelete(id)}
          ></button>
        </div>
        {tasktype === "editing" ? (
          <input type="text" className="edit" value="Editing task" />
        ) : null}
      </li>
    );
  }
}
