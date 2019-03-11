import React, { Component } from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { listWithCommas } from '../utils/fmt';

class MemoListItem extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	handleItemClick() {
		setTimeout(() => this.props.history.push('/memo'), 200);
	}

  render() {
		return (
			<ListItem
				button divider
				selected={this.props.selected}
				onClick={() => this.handleItemClick()}
				>
				<ListItemText
					primary={this.props.title}
					secondary={listWithCommas(this.props.categories)} />
			</ListItem>
		)
	}
}

export default withRouter(MemoListItem);
