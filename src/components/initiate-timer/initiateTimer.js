/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

import './initiateTimer.css';

const InitiateTimer = (props) => {
  const { passSec, passMin } = props;
  const regexp = /^[0-9]\d*$/;
  const handleMinutes = (evt, type) => {
    const num = evt.target.value;
    if (num === '' || regexp.test(num)) {
      if (type === 'min') {
        passMin(num * 60000);
      } else {
        passSec(num * 1000);
      }
    } else if (type === 'min') {
      passMin(0);
    } else {
      passSec(0);
    }
  };

  return (
    <>
      <input
        className="new-todo-form__timer"
        type="text"
        pattern="[0-9]"
        placeholder="Min"
        onChange={(evt) => handleMinutes(evt, 'min')}
      />
      <input
        className="new-todo-form__timer"
        pattern="[0-9]"
        placeholder="Sec"
        onChange={(evt) => handleMinutes(evt, 'sec')}
      />
    </>
  );
};

InitiateTimer.propTypes = {
  passSec: PropTypes.func,
  passMin: PropTypes.func,
};

InitiateTimer.defaultProps = {
  passSec: () => {},
  passMin: () => {},
};

export default InitiateTimer;
