import React, { Component } from "react";

import List from "@material-ui/core/List";

import Item from "./parts/Item"

class ListItems extends Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
  }

  renderItems() {
    return this.props.items.map((i, index) => {
      return (
        <Item
          key={index}
          item={i}
          onDelete={this.props.onDelete}
          onToggle={this.props.onToggle}
        >
        </Item>
      );
    });
  }

  render() {
    return <List>{this.renderItems()}</List>;
  }
}

export default ListItems;
