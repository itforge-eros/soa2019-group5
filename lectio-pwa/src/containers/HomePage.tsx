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
	IconButton,
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
			errorDialogOpen: false
		}
	}

	componentDidMount(): void {
		const idb = Idb.getInstance();
		idb.getFromDB(IdbStoreType.memo)
			.then((event) => {
				// @ts-ignore
				this.setState({memoList: event.target.result});
			})
			.catch((error) => {
				console.log(error);
				this.setState({errorDialogOpen: true});
			});
		/* rest.getAllMemos()
			.then((response) => {
				// save to state.memoList
			})
			.catch((error) => {
				console.log(error);
				this.setState({errorDialogOpen: true});
			}) */
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
					<Typography variant="h4" style={inlineStyles.title}>{strings.pageTitle}</Typography>
				</Header>
				<List>
					{this.state.memoList.reverse().map((m: Memo) =>
						<MemoListItem key={m.name} memo={m}/>
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
