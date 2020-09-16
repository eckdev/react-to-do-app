import React, { Component } from 'react';
import TodoList from './TodoList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>
            todo<span>list</span>
          </h1>
        </header>
        <TodoList />
      </div>
    );
  }
}

export default App;
