/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';

import './task.css';

export default class Task extends Component {
  static propTypes = {
    properties: PropTypes.shape({
      status: PropTypes.string,
      description: PropTypes.string,
      created: PropTypes.instanceOf(Date),
      id: PropTypes.number,
      hidden: PropTypes.bool,
    }).isRequired,
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
    onMark: PropTypes.func,
  };

  static defaultProps = {
    onDelete: () => {},
    onChange: () => {},
    onMark: () => {},
  };

  state = {
    changedEntry: '',
    date: new Date(),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  newValue = (evt) => {
    this.setState({ changedEntry: evt.target.value });
    const { properties } = this.props;
    properties.description = evt.target.value;
  };

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    const { properties, onDelete, onChange, onMark } = this.props;
    const { status: tasktype, description, created, id, hidden } = properties;
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
            <span className="description">{description}</span>
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
            onChange={this.newValue}
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
