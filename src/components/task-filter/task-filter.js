/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

function changeSelectedClass(evt) {
  const buttonsArray = document.querySelectorAll('.filters li button');
  buttonsArray.forEach((el) => {
    if (el !== evt.target && el.classList.contains('selected')) {
      el.classList.remove('selected');
    } else if (el === evt.target && !el.classList.contains('selected')) {
      el.classList.add('selected');
    }
  });
}
function filter(changeClassFunc, filterFunc) {
  filterFunc();
}
const TaskFilter = ({ filterCompleted, filterActive, filterAll }) => {
  return (
    <ul className="filters">
      <li>
        <button type="button" className="selected" onClick={(evt) => filter(changeSelectedClass(evt), filterAll)}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={(evt) => filter(changeSelectedClass(evt), filterActive)}>
          Active
        </button>
      </li>
      <li>
        <button type="button" onClick={(evt) => filter(changeSelectedClass(evt), filterCompleted)}>
          Completed
        </button>
      </li>
    </ul>
  );
};
TaskFilter.defaultProps = {
  filterCompleted: () => {},
  filterActive: () => {},
  filterAll: () => {},
};
TaskFilter.propTypes = {
  filterCompleted: PropTypes.func,
  filterActive: PropTypes.func,
  filterAll: PropTypes.func,
};
export default TaskFilter;
