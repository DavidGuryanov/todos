/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import Timer from '../timer/timer';

import './task.css';

const Task = (props) => {
  const { properties, onDelete, onChange, onMark, onChangeText } = props;
  const { status: tasktype, description, created, id, hidden, timer } = properties;

  const [ms, setMs] = useState(timer);
  const [startDate, setStartDate] = useState(+new Date());
  const [date, setDate] = useState(777);
  const [leftSec, setLeftSec] = useState(0);
  const [paused, setPaused] = useState(false);
  // let timerID;
  const cdTimer = useRef();
  const savedCallback = useRef();

  const tick = () => {
    setDate(new Date());
  };

  const countdown = useCallback(() => {
    const finish = startDate + ms;
    const now = new Date();
    const left = finish - now;
    setLeftSec(left);
  }, [ms, startDate]);

  //! ?
  useEffect(() => {
    savedCallback.current = countdown;
  });

  useEffect(() => {
    //* mount
    if (ms > 0) {
      countdown();
    }
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      //* unmount
      clearInterval(timerID);
      clearTimeout(cdTimer.current);
    };
  }, [countdown, ms]);

  useEffect(() => {
    if (!paused && leftSec > 0) {
      countdown();
    } else if (paused) {
      clearTimeout(cdTimer.current);
    }
    return () => {
      clearTimeout(cdTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  useEffect(() => {
    if (!paused && leftSec > 1000) {
      cdTimer.current = setTimeout(countdown, 1000);
    }
    return () => {
      clearTimeout(cdTimer.current);
    };
  }, [countdown, leftSec, paused]);

  const stopCD = () => {
    setPaused(true);
  };

  const resumeCD = () => {
    if (paused && leftSec > 0) {
      setPaused(false);
      setStartDate(+new Date());
      setMs(leftSec);
    }
  };

  const time = formatDistanceToNow(created, {
    addSuffix: true,
    includeSeconds: true,
  });

  const liClasses = `${tasktype} ${hidden ? 'hidden' : ''}`;
  return (
    <li className={liClasses}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={tasktype === 'completed'}
          onClick={() => onMark(id)}
        />
        <label>
          <span className="title">{description}</span>
          <Timer start={leftSec} pause={stopCD} resume={resumeCD} />
          <span className="created">created {time}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={() => onChange(id)} />
        <button type="button" className="icon icon-destroy" onClick={() => onDelete(id)} />
      </div>
      {tasktype === 'editing' ? (
        <input
          type="text"
          className="edit"
          value={description}
          onChange={(evt) => onChangeText(id, evt.target.value)}
          onKeyUp={(evt) => {
            if (evt.keyCode === 13) {
              onMark(id);
            }
          }}
        />
      ) : null}
    </li>
  );
};

Task.propTypes = {
  properties: PropTypes.shape({
    status: PropTypes.string,
    description: PropTypes.string,
    created: PropTypes.instanceOf(Date),
    id: PropTypes.number,
    hidden: PropTypes.bool,
    timer: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
  onMark: PropTypes.func,
  onChangeText: PropTypes.func,
};

Task.defaultProps = {
  onDelete: () => {},
  onChange: () => {},
  onMark: () => {},
  onChangeText: () => {},
};

export default Task;
