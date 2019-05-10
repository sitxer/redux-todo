import React, { Component } from "react";

import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

class Item extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      isDeleted: false,
    };
  }

  onDelete(id) {
    const cancel = this.props.onDelete(id);

    this.setState({
      cancel,
      isDeleted: true,
    });
  }

  onCancel() {
    this.state.cancel();

    this.setState({
      isDeleted: false,
    });
  }

  render() {
    return (
      <ListItem
        role={undefined}
        dense
        button
        onClick={this.props.onToggle.bind(this, this.props.item.id)}>
        <Checkbox
          checked={this.props.item.isCompleted}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText primary={this.props.item.text} />
        {!this.state.isDeleted ? (
          <ListItemSecondaryAction
            onClick={this.onDelete.bind(this, this.props.item.id)}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        ) : (
          <ListItemSecondaryAction onClick={this.onCancel}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}

export default Item;
