/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../newTaskForm/new-task-form';
import InitiateTimer from '../initiate-timer/initiateTimer';

import './header.css';

const Header = (props) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setseconds] = useState(0);

  const passMin = (min) => {
    setMinutes(min);
  };

  const passSec = (sec) => {
    setseconds(sec);
  };

  const { onNewTask } = props;
  return (
    <header className="header">
      <form className="new-todo-form">
        <h1>todos</h1>
        <NewTaskForm onNewTask={onNewTask} time={seconds + minutes} />
        <InitiateTimer passMin={passMin} passSec={passSec} />
      </form>
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
