import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, List } from '@material-ui/core';
import { ArrowBack, Tune } from '@material-ui/icons';
import MemoListItem from '../components/MemoListItem';
import Memo from "../model/Memo";
import Idb from '../utils/Idb';

const inlineStyles = {
  toolbar: {
    paddingLeft: '8px',
    paddingRight: '16px',
    backgroundColor: '#fff'
  },
  searchBar: {
    flex: 1,
    marginLeft: '8px',
  }
};

class SearchPage extends Component<any, any> {
	idb = Idb.getInstance();

	constructor(props: any) {
		super(props);
		this.state = {
			memoList: []
		};
		this.handleBackBtn = this.handleBackBtn.bind(this);
	}

	componentDidMount(): void {
		this.idb.getMemo()
			.then((event) => {
				// @ts-ignore
				this.setState({ memoList: event.target.result });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	private handleBackBtn(): void {
		setTimeout(() => this.props.history.goBack(), 180);
	}

	private handleSearchValueChange(): void {}

	render() {
		return (
			<Fragment>
				<AppBar position="fixed" color="default" elevation={0}>
          <Toolbar style={inlineStyles.toolbar}>
            <IconButton onClick={this.handleBackBtn}>
              <ArrowBack />
            </IconButton>
            <InputBase
              placeholder="Type to search for memos"
              onChange={this.handleSearchValueChange}
              value={this.state.searchValue}
              style={inlineStyles.searchBar}
            />
            <IconButton>
            	<Tune />
            </IconButton>
          </Toolbar>
      	</AppBar>
				<div className="contentArea">
	        <List>
						{ this.state.memoList.map((m: Memo) =>
							<MemoListItem memo={m} key={m.name} />
						) }
					</List>
				</div>
			</Fragment>
		)
	}
}

export default SearchPage;
