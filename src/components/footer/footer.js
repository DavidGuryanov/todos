/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../task-filter/task-filter';

import './footer.css';

const Footer = function Footer(props) {
  const { itemsLeft, filterCompleted, filterActive, filterAll, removeCompleted } = props;
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TaskFilter filterCompleted={filterCompleted} filterActive={filterActive} filterAll={filterAll} />
      <button type="button" className="clear-completed" onClick={removeCompleted}>
        Clear completed
      </button>
    </footer>
  );
};
Footer.propTypes = {
  itemsLeft: PropTypes.number,
  filterCompleted: PropTypes.func,
  filterActive: PropTypes.func,
  filterAll: PropTypes.func,
  removeCompleted: PropTypes.func,
};

Footer.defaultProps = {
  itemsLeft: 666,
  filterCompleted: () => {},
  filterActive: () => {},
  filterAll: () => {},
  removeCompleted: () => {},
};
export default Footer;
