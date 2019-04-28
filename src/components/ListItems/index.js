import React, { Component } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class ListItems extends Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
  }

  renderItems() {
    return this.props.items.map((i, index) => {
      return (
        <ListItem
          key={index}
          role={undefined}
          dense
          button
          onClick={this.props.onToggle.bind(this, i.id)}>
          <Checkbox checked={i.isCompleted} tabIndex={-1} disableRipple />
          <ListItemText primary={i.text} />
          <ListItemSecondaryAction
            onClick={this.props.onDelete.bind(this, i.id)}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }

  render() {
    return <List>{this.renderItems()}</List>;
  }
}

export default ListItems;
