import React, {Component, Fragment} from 'react';
import {
	AppBar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Fab,
	IconButton, LinearProgress,
	List,
	Toolbar,
	Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import Header from '../components/Header';
import MemoListItem from '../components/MemoListItem';
import Memo from "../model/Memo";
import Idb from '../utils/Idb';
import * as rest from '../utils/rest';
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

const strings = {
	pageTitle: 'Recordings',
	ariaSettingBtn: 'Open settings',
	ariaRecordBtn: 'Add a new memo',
	ariaSearchBtn: 'Search for memos',
	errorDialogTitle: 'Error loading memos',
	errorDialogContent: 'Cannot get memos. Please relaunch the app.',
	errorDialogReload: 'Relaunch'
};

class HomePage extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			memoList: [],
			errorDialogOpen: false,
			isLoadingMemos: true
		}
	}

	componentDidMount(): void {
		const idb = Idb.getInstance();
		idb.getFromDB(IdbStoreType.memo)
			.then((event) => {
				// @ts-ignore
				this.setState({memoList: event.target.result, isLoadingMemos: false});
			})
			.catch((error) => {
				console.log(error);
				this.setState({errorDialogOpen: true, isLoadingMemos: false});
			});
		// TODO: Fetch only on first visit of the session
		rest.getAllMemos()
			.then((response) => {
				// TODO: Save to state.memoList
				console.log('Memos fetched');
				console.log(response);
				this.setState({isLoadingMemos: false});
			})
			.catch((error) => {
				console.log('Memos not fetched');
				console.log(error);
				this.setState({isLoadingMemos: false});
				//this.setState({errorDialogOpen: true});
			});
	}

	private handleFabClick(): void {
		setTimeout(() => this.props.history.push('/record'), 180);
	}

	private handleSearchClick(): void {
		setTimeout(() => this.props.history.push('/search'), 180);
	}

	render() {
		const memosToDisplay = this.state.memoList.concat().reverse(); // concat to prevent array mutation
		return (
			<Fragment>
				<Header>
					<Typography variant="h4" style={inlineStyles.title}>{strings.pageTitle}</Typography>
				</Header>
				{this.state.isLoadingMemos && <LinearProgress />}
				<List>
					{memosToDisplay.map((m: Memo) =>
						<MemoListItem key={m.name} memo={m} schema='local' />
					)}
				</List>
				<AppBar position="fixed" color="default" style={inlineStyles.appBar}>
					<Toolbar style={inlineStyles.toolbar}>
						<IconButton color="inherit" aria-label={strings.ariaSettingBtn}>
							<SettingsIcon/>
						</IconButton>
						<Fab color="primary" aria-label={strings.ariaRecordBtn} style={inlineStyles.fab}
						     onClick={() => this.handleFabClick()}>
							<AddIcon/>
						</Fab>
						<IconButton color="inherit" aria-label={strings.ariaSearchBtn} onClick={() => this.handleSearchClick()}>
							<SearchIcon/>
						</IconButton>
					</Toolbar>
				</AppBar>
				<Dialog open={this.state.errorDialogOpen}>
					<DialogTitle>{strings.errorDialogTitle}</DialogTitle>
					<DialogContent>
						<DialogContentText>{strings.errorDialogContent}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button color="primary" autoFocus onClick={() => location.reload()}>{strings.errorDialogReload}</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		)
	}
}

export default HomePage;
