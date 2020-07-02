import React, { Component } from "react";
import "./new-task-form.css";
export default class NewTaskForm extends Component {
  state = {
    newEntry: "",
  };
  onNewEntry = (e) => {
    this.setState({ newEntry: e.target.value });
  };
  render() {
    const { onNewTask } = this.props;

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={this.onNewEntry}
        value={this.state.newEntry}
        onKeyUp={(e) => {
          if (e.keyCode === 13 && this.state.newEntry.length > 0) {
            onNewTask(this.state.newEntry);
            this.setState({ newEntry: "" });
          }
        }}
      />
    );
  }
}
