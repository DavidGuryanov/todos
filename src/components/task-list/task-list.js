/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';

import './task-list.css';

const TaskList = ({ tasks, onDelete, onChange, onMark, onChangeText }) => {
  const tasksList = tasks.map((item) => {
    return (
      <Task
        properties={item}
        key={item.id}
        onDelete={onDelete}
        onChange={onChange}
        onMark={onMark}
        onChangeText={onChangeText}
      />
    );
  });

  return <ul className="todo-list">{tasksList}</ul>;
};

TaskList.defaultProps = {
  onDelete: () => {},
  onChange: () => {},
  onMark: () => {},
  onChangeText: () => {},
};
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
  onMark: PropTypes.func,
  onChangeText: PropTypes.func,
};

export default TaskList;
