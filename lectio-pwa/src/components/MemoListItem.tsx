import React, { Component } from "react";
import { ListItem, ListItemText } from "@material-ui/core";

class MemoListItem extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

  render() {
		return (
			<ListItem button>
				<ListItemText primary={this.props.title} secondary={this.props.secondary} />
			</ListItem>
		)
	}
}

export default MemoListItem;
