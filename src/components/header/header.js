/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../newTaskForm/new-task-form';
import InitiateTimer from '../initiate-timer/initiateTimer';

import './header.css';

export default class Header extends Component {
  state = {
    min: 0,
    sec: 0,
  };

  passMin = (minutes) => {
    this.setState({ min: minutes });
  };

  passSec = (seconds) => {
    this.setState({ sec: seconds });
  };

  render() {
    const { onNewTask } = this.props;
    const { sec, min } = this.state;

    return (
      <header className="header">
        <form className="new-todo-form">
          <h1>todos</h1>
          <NewTaskForm onNewTask={onNewTask} time={sec + min} />

          <InitiateTimer passMin={this.passMin} passSec={this.passSec} test={this.test} />
        </form>
      </header>
    );
  }
}

Header.defaultProps = {
  onNewTask: () => {},
};
Header.propTypes = {
  onNewTask: PropTypes.func,
};
