import React, { Component } from 'react';
import { ListItem, ListItemText } from "@material-ui/core";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { listWithCommas } from '../utils/fmt';
import Memo from '../model/Memo';

type theProp = {
	memo: Memo | serverMemo,
	history: any,
	selected?: boolean,
	schema: 'local' | 'server'
};

/**
 * A ListItem for displaying a Memo object
 */
class MemoListItem extends Component<theProp & RouteComponentProps<{}>, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			memoName: '',
			memoTags: '',
			memoId: ''
		};
	}

	componentWillMount(): void {
		const isLocal = this.props.schema === 'local';

		// @ts-ignore
		const memoName = isLocal ? this.props.memo.name : this.props.memo.title;
		// @ts-ignore
		const memoId = isLocal ? this.props.memo.id : this.props.memo.uuid;
		const memoTags: Array<string> = isLocal ?
			// @ts-ignore
			this.props.memo.tags.map((t: MemoTag) => t.name) :
			this.props.memo.tags;

		this.setState({ memoName, memoId, memoTags });
	}

	handleItemClick() {
		const url = '/memo/' + this.state.memoId;
		setTimeout(() => this.props.history.push(url), 200);
	}

  render() {
		return (
			<ListItem
				button divider
				selected={this.props.selected}
				onClick={() => this.handleItemClick()}
				>
				<ListItemText
					primary={this.state.memoName}
					secondary={listWithCommas(this.state.memoTags)} />
			</ListItem>
		)
	}
}

export default withRouter(MemoListItem);
