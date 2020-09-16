import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

class TodoForm extends Component {
  state = { description: '' };

  handleChange = e => {
    this.setState({ description: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.description);
    this.setState({ description: '' });
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          className="add-task"
          name="text"
          value={this.state.description}
          onChange={this.handleChange}
          placeholder="Add your task here..."
        />
      </form>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(TodoForm);
