/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './initiateTimer.css';

export default class InitiateTimer extends Component {
  static propTypes = {
    passSec: PropTypes.func,
    passMin: PropTypes.func,
  };

  static defaultProps = {
    passSec: () => {},
    passMin: () => {},
  };

  state = {
    regexp: /^[0-9]\d*$/,
  };

  handleMinutes = (evt, type) => {
    const { passSec, passMin } = this.props;
    const { regexp } = this.state;
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

  render() {
    return (
      <>
        <input
          className="new-todo-form__timer"
          type="text"
          pattern="[0-9]"
          placeholder="Min"
          onChange={(evt) => this.handleMinutes(evt, 'min')}
        />
        <input
          className="new-todo-form__timer"
          pattern="[0-9]"
          placeholder="Sec"
          onChange={(evt) => this.handleMinutes(evt, 'sec')}
        />
      </>
    );
  }
}
