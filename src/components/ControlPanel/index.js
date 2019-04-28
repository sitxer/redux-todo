import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Fab from "@material-ui/core/Fab";
import Add from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";

const styles = () => ({
  controls: {
    padding: "15px",
  },
  input: {
    display: "flex",
    alignItems: "center",
  },
  addButton: {
    marginLeft: "30px",
    minWidth: "40px",
  },
});

class ControlPanel extends Component {
  constructor(state) {
    super(state);

    this.addTodo = this.addTodo.bind(this);
  }

  addTodo() {
    if (this.input.value) {
      this.props.onAdd(this.input.value);
    }
    this.input.value = "";
  }

  render() {
    const { classes } = this.props;

    return (
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
        <Select value={this.props.filter} onChange={this.props.handleFilter}>
          <MenuItem selected value="all">
            все
          </MenuItem>
          <MenuItem value="active">активные</MenuItem>
          <MenuItem value="completed">выполненные</MenuItem>
        </Select>
      </Paper>
    );
  }
}

export default withStyles(styles)(ControlPanel);
