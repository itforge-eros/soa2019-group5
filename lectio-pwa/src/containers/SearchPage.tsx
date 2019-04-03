import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, List } from '@material-ui/core';
import { ArrowBack, Tune } from '@material-ui/icons';
import MemoListItem from '../components/MemoListItem';
import {Memo} from "../types";

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
	constructor(props: any) {
		super(props);
		this.state = {
			memos: [
				{ name: 'Distributed Computing intro', categories: ['DCS', 'Y3S2'] },
				{ name: 'Calculating NPV', categories: ['ITPM', 'Y3S2'] },
				{ name: 'How to train ur dragon', categories: ['Movie'] },
				{ name: 'Cooking without food', categories: ['Cooking'] },
			]
		};
		this.handleBackBtn = this.handleBackBtn.bind(this);
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
            <IconButton onClick={() => this.handleBackBtn()}>
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
						{ this.state.memos.map((m: Memo) =>
							<MemoListItem title={m.name} categories={m.tags} key={m.name} />
						) }
					</List>
				</div>
			</Fragment>
		)
	}
}

export default SearchPage;
