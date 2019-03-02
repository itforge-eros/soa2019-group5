import React, { Component, Fragment } from 'react';
import { Toolbar, Typography, AppBar, Fab, IconButton, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import Header from '../components/Header';
import './HomePage.sass';
import MemoListItem from '../components/MemoListItem';

const styles = {
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
		margin: '0 auto'
	},
	title: {
		fontWeight: 600,
	}
}

const memos = [
	{ name: 'Distributed Computing intro', categories: ['DCS', 'Y3S2'] },
	{ name: 'Calculating NPV', categories: ['ITPM', 'Y3S2'] },
	{ name: 'How to train ur dragon', categories: ['Movie'] },
	{ name: 'Cooking without food', categories: ['Cooking'] },
];

class HomePage extends Component {
  render() {
		return (
			<Fragment>
				<Header>
					<Typography variant="h4" style={styles.title}>Recordings</Typography>
				</Header>
				<List>
					{ memos.map((m) =>
						<MemoListItem title={m.name} categories={m.categories} />
					) }
				</List>
				<AppBar position="fixed" color="primary" style={styles.appBar}>
					<Toolbar style={styles.toolbar}>
						<IconButton color="inherit" aria-label="Open Settings">
							<SettingsIcon />
						</IconButton>
						<Fab color="secondary" aria-label="Add" style={styles.fab}>
							<AddIcon />
						</Fab>
						<IconButton color="inherit" aria-label="Open Settings">
							<SearchIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</Fragment>
		)
  }
}

export default HomePage;
