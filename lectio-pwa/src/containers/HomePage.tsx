import React, { Component, Fragment } from 'react';
import { Toolbar, Typography, AppBar, Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import Header from '../components/Header';
import './HomePage.sass';

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
	}
}

class HomePage extends Component {
  render() {
		return (
			<Fragment>
				<Header>
					<Typography variant="h5">Recordings</Typography>
				</Header>
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
