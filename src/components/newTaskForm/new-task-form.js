/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

const NewTaskForm = (props) => {
  const [newEntry, setNewEntry] = useState('');
  const { onNewTask, time } = props;

  const onNewEntry = (evt) => {
    setNewEntry(evt.target.value);
  };
  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onChange={onNewEntry}
      value={newEntry}
      onKeyUp={(evt) => {
        if (evt.keyCode === 13 && newEntry.length > 0) {
          onNewTask(newEntry, time);
          setNewEntry('');
        }
      }}
    />
  );
};

NewTaskForm.propTypes = {
  onNewTask: PropTypes.func,
  time: PropTypes.number,
};

NewTaskForm.defaultProps = {
  onNewTask: () => {},
  time: 0,
};
export default NewTaskForm;
