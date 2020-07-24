/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  static propTypes = {
    onNewTask: PropTypes.func,
    time: PropTypes.number,
  };

  static defaultProps = {
    onNewTask: () => {},
    time: 0,
  };

  state = {
    newEntry: '',
  };

  onNewEntry = (evt) => {
    this.setState({ newEntry: evt.target.value });
  };

  render() {
    const { newEntry } = this.state;
    const { onNewTask, time } = this.props;

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={this.onNewEntry}
        value={newEntry}
        onKeyUp={(evt) => {
          if (evt.keyCode === 13 && newEntry.length > 0) {
            onNewTask(newEntry, time);
            this.setState({ newEntry: '' });
          }
        }}
      />
    );
  }
}
