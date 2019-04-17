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

class HomePage extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			memoList: []
		}
	}

	componentDidMount(): void {
		const idb = Idb.getInstance();
		idb.getMemo()
			.then((event) => {
				// @ts-ignore
				this.setState({ memoList: event.target.result });
			})
			.catch((error) => {
				console.log(error);
			});
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
					{ this.state.memoList.reverse().map((m: Memo) =>
						<MemoListItem key={m.name} memo={m} />
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
