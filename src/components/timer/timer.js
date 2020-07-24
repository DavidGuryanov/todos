/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

import './timer.css';

const Timer = (props) => {
  const { start, pause, resume } = props;
  const format = (ms) => {
    const minutes = Math.floor(ms / 60000);

    const seconds = Math.floor((ms - minutes * 60000) / 1000);
    let output;
    if (seconds >= 10) {
      output = `${minutes}:${seconds}`;
    } else {
      output = `${minutes}:0${seconds}`;
    }
    return output;
  };
  return (
    <span className="description">
      <button type="button" className="icon icon-play" onClick={resume} />
      <button type="button" className="icon icon-pause" onClick={pause} />

      {format(+start)}
    </span>
  );
};

Timer.propTypes = {
  start: PropTypes.number,
  pause: PropTypes.func,
  resume: PropTypes.func,
};
Timer.defaultProps = {
  start: 0,
  pause: () => {},
  resume: () => {},
};

export default Timer;
