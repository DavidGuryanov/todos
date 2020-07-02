import React, { Component } from "react";
import ReactDOM from "react-dom";

import Header from "./components/header/header";
import TaskList from "./components/task-list/task-list";
import Footer from "./components/footer/footer";
import "./components/main/main.css";
import "./index.css";

export default class App extends Component {
  currentId = 1;
  elementsIndex(arr, id) {
    return arr.findIndex((el) => el.id === id);
  }
  createTodoItem(text, status = "active", hide = false) {
    return {
      status: status,
      description: text,
      created: +new Date() - 17000,
      id: this.currentId++,
      hidden: hide,
    };
  }
  addItem = (text, status = "active", hide) => {
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...this.state.tasksArr];
      newTasksArray.push(this.createTodoItem(text, (status = "active")));
      return {
        tasksArr: newTasksArray,
      };
    });
  };
  state = {
    tasksArr: [
      this.createTodoItem("Completed task", "completed"),
      this.createTodoItem("Editing task", "editing"),
      this.createTodoItem("Active task"),
    ],
  };

  deleteItem = (id) => {
    const index = this.elementsIndex(this.state.tasksArr, id);
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...this.state.tasksArr];
      newTasksArray.splice(index, 1);
      return {
        tasksArr: newTasksArray,
      };
    });
  };
  markItem = (id) => {
    const index = this.elementsIndex(this.state.tasksArr, id);
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...this.state.tasksArr];
      newTasksArray[index].status === "active"
        ? (newTasksArray[index].status = "completed")
        : (newTasksArray[index].status = "active");
      return {
        tasksArr: newTasksArray,
      };
    });
  };
  showCompleted = () => {
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...this.state.tasksArr];
      return {
        tasksArr: newTasksArray.map(function (el) {
          if (el.status !== "completed") {
            el.hidden = true;
          } else {
            el.hidden = false;
          }
          return el;
        }),
      };
    });
  };
  showActive = () => {
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...this.state.tasksArr];
      return {
        tasksArr: newTasksArray.map(function (el) {
          if (el.status !== "active") {
            el.hidden = true;
          } else {
            el.hidden = false;
          }
          return el;
        }),
      };
    });
  };
  showAll = () => {
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...this.state.tasksArr];
      return {
        tasksArr: newTasksArray.map(function (el) {
          el.hidden = false;
          return el;
        }),
      };
    });
  };
  clearCompleted = () => {
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...this.state.tasksArr];
      const test = newTasksArray.filter((el) => el.status !== "completed");
      console.log(test);
      return { tasksArr: test };
      // return {
      //   tasksArr: newTasksArray.map(function (el) {
      //     if (el.status !== "completed") {
      //       return el;
      //     }
      //   }),
      // };
    });
  };
  render() {
    const itemsLeftCount = this.state.tasksArr.filter(
      (el) => el.status === "active"
    ).length;
    return (
      <section className="todoapp">
        <Header onNewTask={this.addItem} />
        <section className="main">
          <TaskList
            tasks={this.state.tasksArr}
            onDelete={this.deleteItem}
            onMark={this.markItem}
          />
          <Footer
            itemsLeft={itemsLeftCount}
            filterCompleted={this.showCompleted}
            filterActive={this.showActive}
            filterAll={this.showAll}
            removeCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".root"));
