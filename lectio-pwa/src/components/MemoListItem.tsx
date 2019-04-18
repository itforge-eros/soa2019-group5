import React, { Component } from 'react';
import { ListItem, ListItemText } from "@material-ui/core";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import { listWithCommas } from '../utils/fmt';
import Memo from '../model/Memo';

type theProp = {
	memo: Memo,
	history: any,
	selected?: boolean
};

/**
 * A ListItem for displaying a Memo object
 */
class MemoListItem extends Component<theProp & RouteComponentProps<{}>, any> {
	constructor(props: any) {
		super(props);
	}

	handleItemClick() {
		const url = '/memo/' + this.props.memo.id;
		setTimeout(() => this.props.history.push(url), 200);
	}

  render() {
 		const tagNames = this.props.memo.tags.map((t: MemoTag) => t.name);
		return (
			<ListItem
				button divider
				selected={this.props.selected}
				onClick={() => this.handleItemClick()}
				>
				<ListItemText
					primary={this.props.memo.name}
					secondary={listWithCommas(tagNames)} />
			</ListItem>
		)
	}
}

export default withRouter(MemoListItem);
