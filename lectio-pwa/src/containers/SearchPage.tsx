import React, {Component, Fragment} from 'react';
import {AppBar, IconButton, InputBase, List, Toolbar} from '@material-ui/core';
import {ArrowBack, Tune} from '@material-ui/icons';
import MemoListItem from '../components/MemoListItem';
import Memo from "../model/Memo";
import Idb from '../utils/Idb';
import * as rest from '../utils/rest';
import ContainerStyle from './Containers.module.sass';
import {IdbStoreType} from '../constants';

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

const strings = {
	searchBar: 'Type to search for memos'
};

class SearchPage extends Component<any, any> {
	idb = Idb.getInstance();
	searchTimeout = setTimeout(() => {}, 0);

	constructor(props: any) {
		super(props);
		this.state = {
			memoList: []
		};
		this.handleBackBtn = this.handleBackBtn.bind(this);
		this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
	}

	private handleBackBtn(): void {
		setTimeout(() => this.props.history.goBack(), 180);
	}

	private handleSearchValueChange(event: any): void {
		// https://schier.co/blog/2014/12/08/wait-for-user-to-stop-typing-using-javascript.html
		clearTimeout(this.searchTimeout);
		const keyword = event.target.value;
		this.searchTimeout = setTimeout(() => {
			this.searchMemos(keyword, []);
		}, 500);
	}

	private searchMemos(keyword: string, tags: serverMemoTag): void {
		rest.searchMemos(keyword, [])
			.then((result) => result.json())
			.then((jsonResult: Array<serverMemo>) => {
				this.setState({
					// @ts-ignore
					memoList: jsonResult.error_code ? [] : jsonResult
				})
			})
			.catch((result) => {
				// TODO: Handle error
			});
	}

	render() {
		return (
			<Fragment>
				<AppBar position="fixed" color="default" elevation={0}>
          <Toolbar style={inlineStyles.toolbar}>
            <IconButton onClick={this.handleBackBtn}>
              <ArrowBack />
            </IconButton>
            <InputBase
              placeholder={strings.searchBar}
              onChange={this.handleSearchValueChange}
              value={this.state.searchValue}
              style={inlineStyles.searchBar}
            />
            <IconButton>
            	<Tune />
            </IconButton>
          </Toolbar>
      	</AppBar>
				<div className={ContainerStyle.contentArea}>
	        <List>
						{ this.state.memoList.map((m: serverMemo) =>
							<MemoListItem memo={m} key={m.uuid} schema='server' />
						) }
					</List>
				</div>
			</Fragment>
		)
	}
}

export default SearchPage;
