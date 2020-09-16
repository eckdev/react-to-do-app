import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { fetchTodos, toggleTodo, deleteTodo, toggleTab } from '../actions';
import { TABS } from '../actions/types';

class TodoList extends Component {
  componentDidMount = async () => {
    await this.props.fetchTodos();
  };

  removeComplete = () => {
    this.props.todos.forEach(({ isCompleted, _id }) => {
      if (isCompleted) this.props.deleteTodo(_id);
    });
  };

  renderTodos = todos => {
    return todos.map(todo => {
      return (
        <Todo
          key={todo._id}
          id={todo._id}
          description={todo.description}
          isCompleted={todo.isCompleted}
          createDate={todo.createDate}
          priority={todo.priority}
          toggleTodo={() => this.props.toggleTodo(todo._id)}
          deleteTodo={() => this.props.deleteTodo(todo._id)}
        />
      );
    });
  };

  renderTabs = currTab => {
    return TABS.map(tab => {
      return (
        <button
          key={tab}
          className={tab === currTab ? 'filter-button selected' : 'filter-button'}
          onClick={() => this.props.toggleTab(tab)}
        >
          {tab}
        </button>
      );
    });
  };

  render() {
    let todos = [];
    if (this.props.currTab === 'all') {
      todos = this.props.todos;
    } else if (this.props.currTab === 'active') {
      todos = this.props.todos.filter(todo => !todo.isCompleted);
    } else if (this.props.currTab === 'done') {
      todos = this.props.todos.filter(todo => todo.isCompleted);
    }

    return (
      <div className="wrapper">
        <TodoForm />
        {this.props.todos.length ? (
          <div style={{ marginBottom: 20, marginLeft: 10 }}>
            {this.props.todos.filter(todo => !todo.isCompleted).length} todos left
          </div>
        ) : null}

        <div>
          {this.props.todos.length ? this.renderTabs(this.props.currTab) : null}
          {this.props.todos.some(todo => todo.isCompleted) ? (
            <button className="filter-button clear" onClick={this.removeComplete}>
              remove done
            </button>
          ) : null}
        </div>

        <ul className="list">
          {this.renderTodos(todos)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ todos, currTab }) => {
  return { todos, currTab };
};

export default connect(
  mapStateToProps,
  { fetchTodos, toggleTodo, deleteTodo, toggleTab }
)(TodoList);
