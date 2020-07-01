import React, { Component } from "react";
import ReactDOM from "react-dom";

import Header from "./components/header/header";
import TaskList from "./components/task-list/task-list";
import Footer from "./components/footer/footer";
import "./components/main/main.css";
import "./index.css";

export default class App extends Component {
  state = {
    tasksArr: [
      {
        status: "completed",
        description: "Completed task",
        created: +new Date() - 17000,
        id: 1,
      },
      {
        status: "editing",
        description: "Editing task",
        created: +new Date(),
        id: 2,
      },
      {
        status: "active",
        description: "Active task",
        created: +new Date() - 300000,
        id: 3,
      },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...this.state.tasksArr];
      newTasksArray.splice(id - 1, 1);
      return {
        tasksArr: newTasksArray,
      };
    });
  };
  markItem = (id) => {
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...this.state.tasksArr];
      newTasksArray[id - 1].status === "active"
        ? (newTasksArray[id - 1].status = "completed")
        : (newTasksArray[id - 1].status = "active");
      return {
        tasksArr: newTasksArray,
      };
    });
  };
  render() {
    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList
            tasks={this.state.tasksArr}
            onDelete={this.deleteItem}
            onMark={this.markItem}
          />
          <Footer />
        </section>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".root"));
