/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import Timer from '../timer/timer';

import './task.css';

export default class Task extends Component {

  
  
  static propTypes = {
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


  static defaultProps = {
    onDelete: () => {},
    onChange: () => {},
    onMark: () => {},
    onChangeText: () => {},
  };

  constructor (props) {
      super(props);
      const {
        properties: { timer },
      } = this.props;

      this.state = {
    ms: timer,
    startDate: +new Date(),
    leftSec: 0,
    paused: false,
  };
    }

  


  componentDidMount() {
    const { ms } = this.state;
    if (ms > 0) {
      this.countdown();
    }
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.cdTimer);
  }

  countdown = () => {
    const { startDate, ms, paused, leftSec } = this.state;
    const finish = startDate + ms;
    const now = new Date();
    const left = finish - now;
    this.setState(() => {
      return {
        leftSec: left,
      };
    });

    if (paused) {
      this.setState(({ leftSec }) => {
        const compensate = leftSec + 1000;
        return {
          leftSec: compensate,
        };
      });
      clearTimeout(this.cdTimer);
    } else if (leftSec < 2000 && leftSec > 0) {
      clearTimeout(this.cdTimer);
    } else if (!paused) {
      const cdTimer = setTimeout(this.countdown, 1000);
    }
  };

  stopCD = () => {
    this.setState(() => {
      return {
        paused: true,
      };
    });
  };

  resumeCD = () => {
    const { paused, leftSec } = this.state;
    if (paused) {
      this.setState(() => {
        return {
          paused: false,
          startDate: +new Date(),
          ms: leftSec,
        };
      }, this.countdown);
    }
  };

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    const { properties, onDelete, onChange, onMark, onChangeText } = this.props;
    const { status: tasktype, description, created, id, hidden } = properties;
    const { leftSec } = this.state;
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
            <Timer start={leftSec} pause={this.stopCD} resume={this.resumeCD} />
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
  }
}
