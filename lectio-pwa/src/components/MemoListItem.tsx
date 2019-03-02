import React, { Component } from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { listWithCommas } from '../utils/fmt';

class MemoListItem extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

  render() {
		return (
			<ListItem button divider selected={this.props.selected}>
				<ListItemText
					primary={this.props.title}
					secondary={listWithCommas(this.props.categories)} />
			</ListItem>
		)
	}
}

export default MemoListItem;
