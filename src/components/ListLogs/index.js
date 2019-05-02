import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class ListLogs extends Component {
  render() {
    return (
      <List dense>
        {this.props.logs.map((item, key) => {
          return (
            <ListItem key={key}>
              <ListItemText primary={item} />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default ListLogs;
