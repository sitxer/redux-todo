import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { addTodo, toggleTodo, deleteTodo } from "../../actions/todos";
import { filterChange } from "../../actions/filters";
import ListItems from "../../components/ListItems";
import ControlPanel from "../../components/ControlPanel";

const styles = theme => ({
  root: {
    width: "600px",
    margin: "0 auto",
    padding: "30px 0",
  },

  items: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.background.paper,
    minHeight: "300px",
  },
});

class App extends Component {
  constructor(state) {
    super(state);

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(event) {
    this.props.onFilter(event.target.value);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={12}>
          <ControlPanel
            filter={this.props.filter}
            handleFilter={this.handleFilter}
            onAdd={this.props.onAdd}
          />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.items}>
            <ListItems
              items={this.props.items}
              onToggle={this.props.onToggle}
              onDelete={this.props.onDelete}
            />
          </Paper>
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
    default:
      return state;
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
