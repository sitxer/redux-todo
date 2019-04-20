import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, filterChange } from "../../actions/";

import "./style.scss";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Add from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


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
      <div className={"todo"}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={"todo__controls"}>
              <div className={"todo__input-field"}>
                <Input
                  fullWidth
                  inputRef={input => (this.input = input)}
                  label="Dense"
                  placeholder={"Введите текст"}
                />
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="Add"
                  onClick={this.addTodo}className={"todo__input-add"}>
                  <Add />
                </Fab>
              </div>
              <Select
                value={this.props.filter}
                onChange={this.handleFilter}
                className={"todo__select"}>
                <MenuItem selected value="all">
                  все
                </MenuItem>
                <MenuItem value="active">активные</MenuItem>
                <MenuItem value="completed">выполненные</MenuItem>
              </Select>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={"todo__wrapper"}>{this.renderList()}</Paper>
          </Grid>
        </Grid>
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
