/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header/header';
import TaskList from './components/task-list/task-list';
import Footer from './components/footer/footer';
import './components/main/main.css';
import './index.css';

export default class App extends Component {
  currentId = 1;

  state = {
    tasksArr: [
      // this.createTodoItem('Completed task', 'completed', new Date()),
      // this.createTodoItem('Editing task', 'editing', new Date()),
      // this.createTodoItem('Active task'),
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
      if (tasksArr[index].status !== 'completed') {
        const copy = { ...newTasksArray[index] };
        copy.status = 'editing';
        newTasksArray[index] = copy;
        return { tasksArr: newTasksArray };
      }
      return {};
    });
  };

  changeText = (id, text) => {
    this.setState(({ tasksArr }) => {
      const index = this.elementsIndex(tasksArr, id);
      const newTasksArray = [...tasksArr];
      const copy = { ...newTasksArray[index] };
      copy.description = text;
      newTasksArray[index] = copy;
      return { tasksArr: newTasksArray };
    });
  };

  markItem = (id) => {
    this.setState(({ tasksArr }) => {
      const index = this.elementsIndex(tasksArr, id);
      const newTasksArray = [...tasksArr];
      const copy = { ...newTasksArray[index] };
      if (newTasksArray[index].status === 'active') {
        copy.status = 'completed';
        newTasksArray[index] = copy;
      } else {
        copy.status = 'active';
        newTasksArray[index] = copy;
      }
      return {
        tasksArr: newTasksArray,
      };
    });
  };

  showCompleted = () => {
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...tasksArr];
      return {
        tasksArr: newTasksArray.map((el) => {
          const stupidLint = el;
          if (stupidLint.status !== 'completed') {
            stupidLint.hidden = true;
          } else {
            stupidLint.hidden = false;
          }
          return stupidLint;
        }),
      };
    });
  };

  showActive = () => {
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...tasksArr];
      return {
        tasksArr: newTasksArray.map((el) => {
          const stupidLint = el;
          if (stupidLint.status !== 'active') {
            stupidLint.hidden = true;
          } else {
            stupidLint.hidden = false;
          }
          return stupidLint;
        }),
      };
    });
  };

  showAll = () => {
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...tasksArr];
      return {
        tasksArr: newTasksArray.map((el) => {
          const stupidLint = el;
          stupidLint.hidden = false;
          return stupidLint;
        }),
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...tasksArr];
      const test = newTasksArray.filter((el) => el.status !== 'completed');
      return { tasksArr: test };
    });
  };

  addItem = (text, ms) => {
    // eslint-disable-next-line no-unused-vars
    const timer = setTimeout(() => console.log('now'), ms);
    this.setState(({ tasksArr }) => {
      const newTasksArray = [...tasksArr];
      newTasksArray.push(this.createTodoItem(text, 'active', new Date(), ms));
      return {
        tasksArr: newTasksArray,
      };
    });
  };

  getInterval = () => {};

  createTimer = (func, ms) => {
    // eslint-disable-next-line no-unused-vars
    const timer = setTimeout(func, ms);
  };

  createTodoItem(text, status = 'active', date = new Date(), ms = 5000) {
    this.currentId += 1;
    return {
      status,
      description: text,
      created: date,
      id: this.currentId,
      hidden: false,
      timer: ms,
    };
  }

  elementsIndex(arr, id) {
    return arr.findIndex((el) => el.id === id);
  }

  render() {
    const { tasksArr } = this.state;
    const itemsLeftCount = tasksArr.filter((el) => el.status === 'active').length;
    return (
      <section className="todoapp">
        <Header onNewTask={this.addItem} />
        <section className="main">
          <TaskList
            tasks={tasksArr}
            onDelete={this.deleteItem}
            onChange={this.changeItem}
            onMark={this.markItem}
            onChangeText={this.changeText}
            onCreateTimer={this.createTimer}
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

ReactDOM.render(<App />, document.querySelector('.root'));
