import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, filterChange } from "../../actions/";

import "./style.scss";

class App extends Component {
  constructor(state) {
    super(state);

    this.renderList = this.renderList.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  addTodo() {
    this.input.value && this.props.onAdd(this.input.value);
    this.input.value = "";
  }

  handleFilter(event) {
    this.props.onFilter(event.target.value);
  }

  renderList() {
    return this.props.items.map((i, index) => {
      return (
        <div className={"todo__item"}>
          <span
            className={`todo__text ${
              !i.isCompleted ? "todo__text--active" : "todo__text--completed"
            }`}
            onClick={this.props.onToggle.bind(this, index)}>
            {i.text}{" "}
          </span>
          <span
            onClick={this.props.onDelete.bind(this, index)}
            className={"todo__delete-button"}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className={"todo__wrapper"}>
        <div className={"todo__controls"}>
          <input
            type="text"
            className={"todo__input"}
            ref={input => (this.input = input)}
            placeholder={"Тут текст для тудушечки!"}
          />
          <button onClick={this.addTodo} className={"todo__add-button"}>
            Добавить
          </button>
        </div>

        <select value={this.props.filter} onChange={this.handleFilter}>
          <option selected value="all">
            все
          </option>
          <option value="active">активные</option>
          <option value="completed">выполненные</option>
        </select>
        <div className={"todo__list"}>{this.renderList()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  switch (state.filters) {
    case "all":
      return { items: state.todos, filter: state.filters };
    case "active":
      return {
        items: state.todos.filter(i => !i.isCompleted),
        filter: state.filters,
      };
    case "completed":
      return {
        items: state.todos.filter(i => i.isCompleted),
        filter: state.filters,
      };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onToggle: index => dispatch(toggleTodo(index)),
    onAdd: text => dispatch(addTodo(text)),
    onDelete: index => dispatch(deleteTodo(index)),
    onFilter: filter => dispatch(filterChange(filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
