import React, {ChangeEvent, Component, Fragment} from 'react';
import {
	AppBar,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	InputBase, LinearProgress,
	Slide,
	Toolbar
} from '@material-ui/core';
import {Add as AddIcon, ArrowBack, Delete, ScatterPlot} from '@material-ui/icons';
import {withRouter} from 'react-router-dom';
import {IdbStoreType} from '../constants';
import styles from './MemoPage.module.sass';
import containerStyles from './Containers.module.sass';
import PlaybackControl from "../components/PlaybackControl";
import Idb from '../utils/Idb';
import * as rest from '../utils/rest';
import Memo from '../model/Memo';
import TagSelectionPage from './TagSelectionPage';
import MemoAudio from '../model/MemoAudio';

const inlineStyles = {
	toolbar: {
		paddingLeft: '8px',
		paddingRight: '8px',
		backgroundColor: '#fff'
	},
	memoBody: {
		marginBottom: '1em'
	}
};

const strings: { [index: string] : any } = {
	ariaBackBtn: 'Go back',
	ariaDeleteBtn: 'Delete this memo',
	ariaSummaryBtn: 'Show summary',
	ariaTagAdd: 'Manage tags',
	errorDialog: {
		memoError: {
			title: 'Error loading memo',
			content: 'There was a problem loading this memo.'
		},
		audioError: {
			title: 'Error loading audio',
			content: 'There was a problem loading the audio file of this memo.'
		}
	}
};

const Transition = (props: any) => <Slide direction="up" {...props} />;

class MemoPage extends Component<any, any> {
	private idb = Idb.getInstance();

	constructor(props: any) {
		super(props);
		this.state = {
			memoId: '',
			memoName: '',
			memoBody: '',
			memoTags: [],
			memoAudioId: '',
			memoAudioBlob: undefined,
			tagDialogOpen: false,
			deleteMemo: false,
			errorDialogOpen: false,
			errorType: '',
			isLoadingMemo: true
		};
		this.handleMemoNameChange = this.handleMemoNameChange.bind(this);
		this.handleMemoBodyChange = this.handleMemoBodyChange.bind(this);
		this.handleTagOpen = this.handleTagOpen.bind(this);
		this.handleTagClose = this.handleTagClose.bind(this);
		this.handleErrorOk = this.handleErrorOk.bind(this);
	}

	componentDidMount(): void {
		const memoId = this.props.match.params.id;

		/*this.idb.getFromDB(IdbStoreType.memo, memoId)
			.then((event) => {
				// @ts-ignore
				const memo: Memo = event.target.result;
				this.setState({
					memoId: memo.id,
					memoName: memo.name,
					memoBody: memo.content,
					memoTags: memo.tags,
					memoAudioId: memo.audioId
				});
			})
			.catch((event) => {
				console.error(event);
				this.setState({errorDialogOpen: true, errorType: 'memoError'});
			});*/

		rest.getMemo(memoId)
			.then((response) => response.json())
			.then((jsonResponse: serverMemo) => {
				this.setState({
					isLoadingMemo: false,
					memoId: jsonResponse.uuid,
					memoName: jsonResponse.title,
					memoBody: jsonResponse.content,
					// Convert server memo tags to local memo tags
					memoTags: jsonResponse.tags.map((t: string): MemoTag => ({id: t, name: t})),
					memoAudioId: jsonResponse.uuid,
				});
			})
			.catch((response) => {
				console.error(response);
				this.setState({errorDialogOpen: true, errorType: 'memoError'});
			});

		this.idb.getFromDB(IdbStoreType.memoAudio, memoId)
			.then((event) => {
				// @ts-ignore
				const memoAudio: MemoAudio = event.target.result;
				this.setState({ memoAudioBlob: memoAudio.blob });
			})
			.catch((event) => {
				console.error(event);
				this.setState({errorDialogOpen: true, errorType: 'audioError'});
			});
	}

	componentWillUnmount(): void {
		if (!this.state.deleteMemo) {
			const memoForLocal = new Memo(
				this.state.memoId,
				this.state.memoName,
				this.state.memoBody,
				this.state.memoAudioId,
				this.state.memoTags
			);
			const memoForServer: serverMemo = {
				uuid: this.state.memoId,
				title: this.state.memoName,
				content: this.state.memoBody,
				tags: this.state.memoTags.map((tag: MemoTag) => tag.name)
			};

			this.idb.updateToDB(IdbStoreType.memo, memoForLocal);
			rest.updateMemo(this.state.memoId, memoForServer);
		}
	}

	private handleBackBtn() {
		setTimeout(() => this.props.history.goBack(), 180);
	}

	private handleSummaryBtn() {
		const currentPath: string = this.props.location.pathname;
		setTimeout(() => this.props.history.push(`${currentPath}/summary/`), 180);
	}

	private handleDeleteBtn() {
		this.setState({ deleteMemo: true });
		this.idb.deleteFromDB(IdbStoreType.memo, this.state.memoId)
			.then(() => {
				this.idb.deleteFromDB(IdbStoreType.memoAudio, this.state.memoId);
				this.idb.deleteFromDB(IdbStoreType.transcript, this.state.memoId);
				this.props.history.replace('/');
			})
			.catch((event) => alert('Cannot delete memo'));
	}

	private handleTagOpen() {
		this.setState({ tagDialogOpen: true });
	}

	private handleTagClose(newTags: Array<MemoTag>) {
		this.setState({ tagDialogOpen: false, memoTags: newTags });
	}

	private handleMemoNameChange(event: ChangeEvent): void {
		// @ts-ignore
		this.setState({ memoName: event.target.value });
	}

	private handleMemoBodyChange(event: ChangeEvent): void {
		// @ts-ignore
		this.setState({ memoBody: event.target.value });
	}

	private handleErrorOk(): void {
		// this.props.history.goBack();
		this.setState({errorDialogOpen: false});
	}

	render() {
		return (
			<Fragment>
				<AppBar position="fixed" color="default" elevation={0}>
					<Toolbar style={inlineStyles.toolbar}>
						<IconButton onClick={() => this.handleBackBtn()} aria-label={strings.ariaBackBtn}>
							<ArrowBack />
						</IconButton>
						<div className={containerStyles.grow} />
						<IconButton onClick={() => this.handleDeleteBtn()} aria-label={strings.ariaDeleteBtn}>
							<Delete />
						</IconButton>
						<IconButton onClick={() => this.handleSummaryBtn()} aria-label={strings.ariaSummaryBtn}>
							<ScatterPlot />
						</IconButton>
					</Toolbar>
				</AppBar>

				<div className={styles.contentArea}>
					{this.state.isLoadingMemo && <LinearProgress />}
					<div className={styles.textArea}>
						<InputBase onChange={this.handleMemoNameChange}
						           value={this.state.memoName}
						           className={styles.memoTitle}
						           fullWidth />
						<InputBase onChange={this.handleMemoBodyChange}
						           value={this.state.memoBody}
						           className={containerStyles.bodyText}
						           style={inlineStyles.memoBody}
						           multiline fullWidth />
						<div className={styles.chipWrap}>
							{this.state.memoTags.map((tag: MemoTag) =>
								<Chip key={tag.id} label={tag.name} className={styles.chip}/>
							)}
							<Button onClick={this.handleTagOpen} aria-label={strings.ariaTagAdd}>
								<AddIcon fontSize="small" />
							</Button>
						</div>
					</div>
					{this.state.memoAudioBlob && <PlaybackControl audioBlob={this.state.memoAudioBlob} />}
				</div>

				<Dialog fullScreen open={this.state.tagDialogOpen} TransitionComponent={Transition}>
					<TagSelectionPage onClose={this.handleTagClose} currentTags={this.state.memoTags} />
				</Dialog>

				{this.state.errorType && <Dialog open={this.state.errorDialogOpen}>
					<DialogTitle>{strings.errorDialog[this.state.errorType].title}</DialogTitle>
					<DialogContent>
						<DialogContentText>{strings.errorDialog[this.state.errorType].content}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button color="primary" autoFocus onClick={this.handleErrorOk}>{'OK'}</Button>
					</DialogActions>
				</Dialog>}
			</Fragment>
		);
	}
}

export default withRouter(MemoPage);
