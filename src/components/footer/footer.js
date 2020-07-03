import React, { Component } from "react";
import TaskFilter from "../task-filter/task-filter";
import PropTypes from "prop-types";

import "./footer.css";

export default class Footer extends Component {
  static propTypes = {
    itemsLeft: PropTypes.number,
    filterCompleted: PropTypes.func,
    filterActive: PropTypes.func,
    filterAll: PropTypes.func,
    removeCompleted: PropTypes.func,
  };
  static defaultProps = {
    itemsLeft: 666,
    filterCompleted: () => {},
    filterActive: () => {},
    filterAll: () => {},
    removeCompleted: () => {},
  };

  render() {
    const {
      itemsLeft,
      filterCompleted,
      filterActive,
      filterAll,
      removeCompleted,
    } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{itemsLeft} items left</span>
        <TaskFilter
          filterCompleted={filterCompleted}
          filterActive={filterActive}
          filterAll={filterAll}
        />
        <button className="clear-completed" onClick={removeCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
