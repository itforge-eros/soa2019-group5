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

	constructor(props: any) {
		super(props);
		this.state = {
			memoList: []
		};
		this.handleBackBtn = this.handleBackBtn.bind(this);
		this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
	}

	componentDidMount(): void {
		/*this.idb.getFromDB(IdbStoreType.memo)
			.then((event) => {
				// @ts-ignore
				this.setState({ memoList: event.target.result });
			})
			.catch((error) => {
				console.log(error);
			});*/
	}

	private handleBackBtn(): void {
		setTimeout(() => this.props.history.goBack(), 180);
	}

	private handleSearchValueChange(event: any): void {
		rest.searchMemos(event.target.value, [])
			.then((result) => {
				this.setState({memoList: result});
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
