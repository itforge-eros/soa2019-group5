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
import Header from '../components/Header';
import MemoListItem from '../components/MemoListItem';
import * as rest from '../utils/rest';
import {IdbStoreType, SESSION_STORE_TOKEN} from '../constants';
import {Refresh as RefreshIcon, Search as SearchIcon, Add as AddIcon} from '@material-ui/icons';

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
			isLoadingMemos: true,
			tokenExists: false
		}
	}

	componentWillMount(): void {
		// just set it, not currently using it though
		if (sessionStorage.getItem(SESSION_STORE_TOKEN))
			this.setState({tokenExists: true});
	}

	componentDidMount(): void {
		// uncomment to pull from local DB
		/* const idb = Idb.getInstance();
		idb.getFromDB(IdbStoreType.memo)
			.then((event) => {
				// @ts-ignore
				this.setState({memoList: event.target.result, isLoadingMemos: false});
			})
			.catch((error) => {
				console.error(error);
				this.setState({errorDialogOpen: true, isLoadingMemos: false});
			}); */

		// TODO: Fetch only on first visit of the session (needs to save to DB first)
		this.fetchMemosFromServer();
	}

	private handleFabClick(): void {
		setTimeout(() => this.props.history.push('/record'), 180);
	}

	private handleSearchClick(): void {
		setTimeout(() => this.props.history.push('/search'), 180);
	}

	private handleRefreshClick(): void {
		this.setState({isLoadingMemos: true});
		this.fetchMemosFromServer();
	}

	private fetchMemosFromServer(): void {
		rest.getAllMemos()
			.then((response) => {
				return response.json();
			})
			.then((jsonResponse) => {
				this.setState({isLoadingMemos: false, memoList: jsonResponse});
			})
			.catch((error) => {
				console.error('Memos not fetched');
				console.error(error);
				this.setState({isLoadingMemos: false});
				this.setState({errorDialogOpen: true});
			});
	}

	render() {
		const memosToDisplay = this.state.memoList ?
			this.state.memoList.concat().reverse() : // concat to prevent array mutation
			[] ;

		return (
			<Fragment>
				<Header>
					<Typography variant="h4" style={inlineStyles.title}>{strings.pageTitle}</Typography>
				</Header>
				{this.state.isLoadingMemos && <LinearProgress />}

				<List>
					{memosToDisplay.map((m: serverMemo) =>
						<MemoListItem key={m.uuid} memo={m} schema='server' />
					)}
				</List>

				<AppBar position="fixed" color="default" style={inlineStyles.appBar}>
					<Toolbar style={inlineStyles.toolbar}>
						<IconButton color="inherit" aria-label={strings.ariaSettingBtn}
						            onClick={() => this.handleRefreshClick()}>
							<RefreshIcon/>
						</IconButton>
						<Fab color="primary" aria-label={strings.ariaRecordBtn} style={inlineStyles.fab}
						     onClick={() => this.handleFabClick()}>
							<AddIcon/>
						</Fab>
						<IconButton color="inherit" aria-label={strings.ariaSearchBtn}
						            onClick={() => this.handleSearchClick()}>
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
						<Button color="primary" autoFocus onClick={() => location.reload()}>
							{strings.errorDialogReload}
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		)
	}
}

export default HomePage;
