import React, { Component } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";

import "./task.css";

export default class Task extends Component {
  static propTypes = {
    properties: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
    onMark: PropTypes.func,
  };
  static defaultProps = {
    onDelete: () => {},
    onChange: () => {},
    onMark: () => {},
  };
  state = {
    changedEntry: "",
  };
  newValue = (e) => {
    this.setState({ changedEntry: e.target.value });
    this.props.properties.description = e.target.value;
  };
  render() {
    const { properties, onDelete, onChange, onMark } = this.props;
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
          <button
            className="icon icon-edit"
            onClick={() => onChange(id)}
          ></button>
          <button
            className="icon icon-destroy"
            onClick={() => onDelete(id)}
          ></button>
        </div>
        {tasktype === "editing" ? (
          <input
            type="text"
            className="edit"
            value={description}
            onChange={this.newValue}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                onMark(id);
              }
            }}
          />
        ) : null}
      </li>
    );
  }
}
