import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, filterChange } from "../../actions/";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Add from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  root: {
    width: "600px",
    margin: "0 auto",
    padding: "30px 0",
  },
  listItem: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.background.paper,
    minHeight: "300px",
  },
  controls: {
    padding: "15px",
  },
  input: {
    display: "flex",
    alignItems: "center"
  },
  addButton: {
    marginLeft: "30px",
    minWidth: "40px"
  }
});

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
    const items = this.props.items.map((i, index) => {
      return (
        <ListItem
          key={index}
          role={undefined}
          dense
          button
          onClick={this.props.onToggle.bind(this, index)}>
          <Checkbox checked={i.isCompleted} tabIndex={-1} disableRipple />
          <ListItemText primary={i.text} />
          <ListItemSecondaryAction
            onClick={this.props.onDelete.bind(this, index)}>
            <IconButton aria-label="Comments">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return <List>{items}</List>;
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.controls}>
            <div className={classes.input}>
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
                onClick={this.addTodo}
                className={classes.addButton}>
                <Add />
              </Fab>
            </div>
            <Select value={this.props.filter} onChange={this.handleFilter}>
              <MenuItem selected value="all">
                все
              </MenuItem>
              <MenuItem value="active">активные</MenuItem>
              <MenuItem value="completed">выполненные</MenuItem>
            </Select>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.listItem}>{this.renderList()}</Paper>
        </Grid>
      </Grid>
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
