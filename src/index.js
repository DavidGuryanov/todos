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
  createTodoItem(text, status = "active", date = new Date()) {
    return {
      status: status,
      description: text,
      created: date,
      id: this.currentId++,
      hidden: false,
    };
  }
  addItem = (text, status = "active", hide) => {
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...tasksArr];
      newTasksArray.push(this.createTodoItem(text, (status = "active")));
      return {
        tasksArr: newTasksArray,
      };
    });
  };
  state = {
    tasksArr: [
      this.createTodoItem("Completed task", "completed", +new Date() - 9000000),
      this.createTodoItem("Editing task", "editing", +new Date() - 900000),
      this.createTodoItem("Active task"),
    ],
  };

  deleteItem = (id) => {
    this.setState(({ tasksArr }) => {
      const index = this.elementsIndex(tasksArr, id);
      const newTasksArray = [...tasksArr];
      newTasksArray.splice(index, 1);
      return {
        tasksArr: newTasksArray,
      };
    });
  };
  changeItem = (id) => {
    this.setState(({ tasksArr }) => {
      const index = this.elementsIndex(tasksArr, id);
      const newTasksArray = [...tasksArr];
      if (tasksArr[index].status !== "completed") {
        newTasksArray[index].status = "editing";
        return {
          tasksArr: newTasksArray,
        };
      }
    });
  };
  markItem = (id) => {
    this.setState(({ tasksArr }) => {
      const index = this.elementsIndex(tasksArr, id);
      const newTasksArray = [...tasksArr];
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
      const newTasksArray = [...tasksArr];
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
      const newTasksArray = [...tasksArr];
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
      const newTasksArray = [...tasksArr];
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
      const newTasksArray = [...tasksArr];
      const test = newTasksArray.filter((el) => el.status !== "completed");
      return { tasksArr: test };
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
            onChange={this.changeItem}
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
