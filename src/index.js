/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/header';
import TaskList from './components/task-list/task-list';
import Footer from './components/footer/footer';
import './components/main/main.css';
import './index.css';

const App = () => {
  let currentId = 1;

  const createTodoItem = (text, status = 'active', date = new Date(), ms = 0) => {
    currentId += 1;
    return {
      status,
      description: text,
      created: date,
      id: currentId,
      hidden: false,
      timer: ms,
    };
  };

  const elementsIndex = (arr, id) => {
    return arr.findIndex((el) => el.id === id);
  };

  const [tasksArray, setTasksArray] = useState([
    createTodoItem('Completed task', 'completed', new Date()),
    createTodoItem('Editing task', 'editing', new Date()),
    createTodoItem('Active task'),
  ]);

  const deleteItem = (id) => {
    setTasksArray(() => {
      const index = elementsIndex(tasksArray, id);
      const newTasksArray = [...tasksArray];
      newTasksArray.splice(index, 1);
      return newTasksArray;
    });
  };

  const changeItem = (id) => {
    setTasksArray(() => {
      const index = elementsIndex(tasksArray, id);
      const newTasksArray = [...tasksArray];
      if (tasksArray[index].status !== 'completed') {
        const copy = { ...newTasksArray[index] };
        copy.status = 'editing';
        newTasksArray[index] = copy;
        return newTasksArray;
      }
      return {};
    });
  };

  const changeText = (id, text) => {
    setTasksArray(() => {
      const index = elementsIndex(tasksArray, id);
      const newTasksArray = [...tasksArray];
      const copy = { ...newTasksArray[index] };
      copy.description = text;
      newTasksArray[index] = copy;
      return newTasksArray;
    });
  };

  const markItem = (id) => {
    setTasksArray(() => {
      const index = elementsIndex(tasksArray, id);
      const newTasksArray = [...tasksArray];
      const copy = { ...newTasksArray[index] };
      if (newTasksArray[index].status === 'active') {
        copy.status = 'completed';
        newTasksArray[index] = copy;
      } else {
        copy.status = 'active';
        newTasksArray[index] = copy;
      }
      return newTasksArray;
    });
  };

  const showCompleted = () => {
    setTasksArray(() => {
      const newTasksArray = [...tasksArray];
      const result = newTasksArray.map((el) => {
        const stupidLint = el;
        if (stupidLint.status !== 'completed') {
          stupidLint.hidden = true;
        } else {
          stupidLint.hidden = false;
        }
        return stupidLint;
      });
      return result;
    });
  };

  const showActive = () => {
    setTasksArray(() => {
      const newTasksArray = [...tasksArray];
      const result = newTasksArray.map((el) => {
        const stupidLint = el;
        if (stupidLint.status !== 'active') {
          stupidLint.hidden = true;
        } else {
          stupidLint.hidden = false;
        }
        return stupidLint;
      });
      return result;
    });
  };

  const showAll = () => {
    setTasksArray(() => {
      const newTasksArray = [...tasksArray];
      const result = newTasksArray.map((el) => {
        const stupidLint = el;
        stupidLint.hidden = false;
        return stupidLint;
      });
      return result;
    });
  };

  const clearCompleted = () => {
    setTasksArray(() => {
      const newTasksArray = [...tasksArray];
      const result = newTasksArray.filter((el) => el.status !== 'completed');
      return result;
    });
  };

  const addItem = (text, ms) => {
    // eslint-disable-next-line no-unused-vars
    const timer = setTimeout(() => console.log('now'), ms);
    setTasksArray(() => {
      const newTasksArray = [...tasksArray];
      newTasksArray.push(createTodoItem(text, 'active', new Date(), ms));
      return newTasksArray;
    });
  };

  // getInterval = () => {};

  const createTimer = (func, ms) => {
    // eslint-disable-next-line no-unused-vars
    const timer = setTimeout(func, ms);
  };

  const itemsLeftCount = tasksArray.filter((el) => el.status === 'active').length;
  return (
    <section className="todoapp">
      <Header onNewTask={addItem} />
      <section className="main">
        <TaskList
          tasks={tasksArray}
          onDelete={deleteItem}
          onChange={changeItem}
          onMark={markItem}
          onChangeText={changeText}
          onCreateTimer={createTimer}
        />
        <Footer
          itemsLeft={itemsLeftCount}
          filterCompleted={showCompleted}
          filterActive={showActive}
          filterAll={showAll}
          removeCompleted={clearCompleted}
        />
      </section>
    </section>
  );
};

ReactDOM.render(<App />, document.querySelector('.root'));