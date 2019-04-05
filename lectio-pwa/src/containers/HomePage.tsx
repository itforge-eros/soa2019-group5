import React, { Component, Fragment } from 'react';
import { Toolbar, Typography, AppBar, Fab, IconButton, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import Header from '../components/Header';
import styles from './HomePage.module.sass';
import MemoListItem from '../components/MemoListItem';
import Memo from "../model/Memo";
import Idb from '../utils/Idb';
import {IdbStoreType} from '../constants';

const inlineStyles = {
	appBar: {
		top: 'auto',
		bottom: '0'
	},
	toolbar: {
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	fab: {
		position: 'absolute' as 'absolute',
		top: -30,
		left: 0,
		right: 0,
		margin: '0 auto',
		backgroundColor: '#0062F5',
		color: '#f4f4f4'
	},
	title: {
		fontWeight: 600,
	}
};

const memos: Array<Memo> = [
	{ id: '1', name: 'Distributed Computing intro', tags: ['DCS', 'Y3S2'], content: 'Lorem ipsum', audioId: 'blob' },
	{ id: '2', name: 'Calculating NPV', tags: ['ITPM', 'Y3S2'], content: 'Lorem ipsum', audioId: 'blob' },
	{ id: '3', name: 'How to train ur dragon', tags: ['Movie'], content: 'Lorem ipsum', audioId: 'blob' },
	{ id: '4', name: 'Cooking without food', tags: ['Cooking'], content: 'Lorem ipsum', audioId: 'blob' },
];

class HomePage extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount(): void {
		const idb = Idb.getInstance();
		idb.saveToDB(IdbStoreType.memo, { id: '1', name: 'lel', content: 'ccc', tags: ['t1', 't2'] })
			.then(event => console.log)
			.catch(event => console.log);
	}

	private handleFabClick(): void {
		setTimeout(() => this.props.history.push('/record'), 180);
	}

	private handleSearchClick(): void {
		setTimeout(() => this.props.history.push('/search'), 180);
	}

  render() {
		return (
			<Fragment>
				<Header>
					<Typography variant="h4" style={inlineStyles.title}>Recordings</Typography>
				</Header>
				<List>
					{ memos.map((m: Memo) =>
						<MemoListItem title={m.name} categories={m.tags} key={m.name} />
					) }
				</List>
				<AppBar position="fixed" color="default" style={inlineStyles.appBar}>
					<Toolbar style={inlineStyles.toolbar}>
						<IconButton color="inherit" aria-label="Open Settings">
							<SettingsIcon />
						</IconButton>
						<Fab color="primary" aria-label="Add" style={inlineStyles.fab} onClick={() => this.handleFabClick()}>
							<AddIcon />
						</Fab>
						<IconButton color="inherit" aria-label="Open Settings" onClick={() => this.handleSearchClick()}>
							<SearchIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</Fragment>
		)
  }
}

export default HomePage;
