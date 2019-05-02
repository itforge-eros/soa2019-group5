import React, {ChangeEvent, Component, Fragment} from 'react';
import {AppBar, Button, Chip, IconButton, InputBase, Slide, Toolbar} from '@material-ui/core';
import {Add as AddIcon, ArrowBack, Save} from '@material-ui/icons';
import styles from './MemoPage.module.sass';
import containerStyles from './Containers.module.sass';
import RecordControl from "../components/RecordControl";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Prompt} from "react-router-dom";
import Idb from '../utils/Idb';
import * as rest from '../utils/rest';
import {IdbStoreType} from '../constants';
import Memo from '../model/Memo';
import MemoAudio from '../model/MemoAudio';
import TagSelectionPage from './TagSelectionPage';

type theState = {
	memoId: string,
	memoName: string,
	memoBody: string,
	memoTags: Array<MemoTag>,
	backDialogOpen: boolean,
	blockPageLeave: boolean,
	tagDialogOpen: boolean,
	errorDialogOpen: boolean,
	actionsLeftToProceed: number
}

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

const strings = {
	leaveTitle: 'Discard this memo?',
	leaveContent: 'Do you want to discard this memo?',
	leaveYes: 'Yes',
	leaveNo: 'No',
	saveErrorTitle: 'Cannot save the memo',
	saveErrorContent: 'A problem has occurred and we could not save this memo.',
	ok: 'OK'
};

const Transition = (props: any) => <Slide direction="up" {...props} />;

class RecordPage extends Component<any, theState> {
	idb = Idb.getInstance();
	recordControl: React.RefObject<RecordControl>;
	defaultMemoName: string = `Memo ${new Date().toLocaleString()}`;

	constructor(props: any) {
		super(props);
		this.recordControl = React.createRef();
		this.state = {
			memoId: new Date().getTime().toString(),
			memoName: this.defaultMemoName,
			memoBody: '',
			memoTags: [],
			backDialogOpen: false,
			blockPageLeave: true,
			tagDialogOpen: false,
			errorDialogOpen: false,
			actionsLeftToProceed: 4 // save memo, audio, transcript, server
		};
		this.handleLeaveDialogNo = this.handleLeaveDialogNo.bind(this);
		this.handleLeaveDialogYes = this.handleLeaveDialogYes.bind(this);
		this.handleSaveBtn = this.handleSaveBtn.bind(this);
		this.handleMemoNameChange = this.handleMemoNameChange.bind(this);
		this.handleMemoBodyChange = this.handleMemoBodyChange.bind(this);
		this.handleTagOpen = this.handleTagOpen.bind(this);
		this.handleTagClose = this.handleTagClose.bind(this);
	}

	private handleSaveBtn(): void {
		// Set a reference to RecordControl instance
		let rc = this.recordControl.current;
		// Prevent null
		if (rc) {
			rc.getRecording((blobEvent: any) => {
				const finalMemoName =
					this.state.memoName.trim() === '' ?
						this.defaultMemoName : this.state.memoName.trim();

				const memoToSave: Memo = new Memo(
					this.state.memoId,
					finalMemoName,
					this.state.memoBody,
					this.state.memoId,
					this.state.memoTags
				);

				const memoAudioToSave: MemoAudio = new MemoAudio(
					this.state.memoId,
					blobEvent.data
				);

				const memoTranscript: MemoTranscript = {
					id: this.state.memoId,
					// @ts-ignore
					transcript: rc.getTranscript(),
					summary: ''
				};

				// save audio
				this.idb.saveToDB(IdbStoreType.memoAudio, memoAudioToSave)
					.then(() => {
						this.setState((prev) => ({ actionsLeftToProceed: prev.actionsLeftToProceed - 1 }));
						this.goBackToHomePage();
					})
					.catch((error: any) => {
						console.log(error.target);
						this.setState({ errorDialogOpen: true });
					});
				// save memo
				this.idb.saveToDB(IdbStoreType.memo, memoToSave)
					.then(() => {
						this.setState((prev) => ({ actionsLeftToProceed: prev.actionsLeftToProceed - 1 }));
						this.goBackToHomePage();
					})
					.catch((event: any) => {
						console.log(event.target);
						this.setState({ errorDialogOpen: true });
					});
				// save transcript
				this.idb.saveToDB(IdbStoreType.transcript, memoTranscript)
					.then(() => {
						this.setState((prev) => ({
							actionsLeftToProceed: prev.actionsLeftToProceed - 1,
							blockPageLeave: false
						}));
						this.goBackToHomePage();
					})
					.catch((event: any) => {
						console.log(event.target);
						this.setState({ errorDialogOpen: true });
					});

				// save memo to server
				rest.updateMemo(this.state.memoId, memoToSave)
					.then(() => {
						this.setState((prev) => ({ actionsLeftToProceed: prev.actionsLeftToProceed - 1 }));
					})
					.catch(() => {
						// TODO: Catch error
					})
			});
		}
	}

	private handleBackBtn() { this.handleLeaveDialogOpen() }

	private handleTagOpen() { this.setState({ tagDialogOpen: true }) }

	private handleTagClose(newTags: Array<MemoTag>): void {
		this.setState({ tagDialogOpen: false, memoTags: newTags });
	}

	private handleLeaveDialogOpen() { this.setState({ backDialogOpen: true }) }

	private handleLeaveDialogNo() { this.setState({ backDialogOpen: false }) }

	private handleLeaveDialogYes() {
		this.setState({ backDialogOpen: false, blockPageLeave: false });
		rest.deleteMemo(this.state.memoId);
		setTimeout(() => this.props.history.goBack(), 180);
	}

	private handleErrorDialogOk(): void { this.setState({ errorDialogOpen: false }) }

	private handleMemoNameChange(event: ChangeEvent): void {
		// @ts-ignore
		this.setState({ memoName: event.target.value });
	}

	private handleMemoBodyChange(event: ChangeEvent): void {
		// @ts-ignore
		this.setState({ memoBody: event.target.value });
	}

	private goBackToHomePage(): void {
		if (this.state.actionsLeftToProceed === 0)
			this.props.history.replace('/');
	}

	render() {
		return (
			<Fragment>
				<AppBar position="fixed" color="default" elevation={0}>
					<Toolbar style={inlineStyles.toolbar}>
						<IconButton onClick={() => this.handleBackBtn()}>
							<ArrowBack />
						</IconButton>
						<div className={containerStyles.grow} />
						<IconButton onClick={this.handleSaveBtn}>
							<Save />
						</IconButton>
					</Toolbar>
				</AppBar>
				<div className={styles.contentArea}>
					<div className={styles.textArea}>
						<InputBase onChange={this.handleMemoNameChange}
						           placeholder={this.state.memoName}
						           className={styles.memoTitle}
						           fullWidth />
						<InputBase onChange={this.handleMemoBodyChange}
						           placeholder="Note"
						           className={containerStyles.bodyText}
						           style={inlineStyles.memoBody}
						           multiline fullWidth />
						<div className={styles.chipWrap}>
							{this.state.memoTags.map(tag => (
								<Chip label={tag.name} className={styles.chip} />
							))}
							<Button onClick={this.handleTagOpen}>
								<AddIcon fontSize="small" />
							</Button>
						</div>
					</div>
					<RecordControl ref={this.recordControl} />
				</div>
				<Dialog open={this.state.backDialogOpen}>
					<DialogTitle>{strings.leaveTitle}</DialogTitle>
					<DialogContent>
						<DialogContentText>{strings.leaveContent}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button color="primary" onClick={this.handleLeaveDialogYes}>{strings.leaveYes}</Button>
						<Button color="primary" onClick={this.handleLeaveDialogNo}>{strings.leaveNo}</Button>
					</DialogActions>
				</Dialog>
				<Dialog open={this.state.errorDialogOpen}>
					<DialogTitle>{strings.saveErrorTitle}</DialogTitle>
					<DialogContent>
						<DialogContentText>{strings.saveErrorContent}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button color="primary" onClick={() => this.handleErrorDialogOk}>{strings.ok}</Button>
					</DialogActions>
				</Dialog>
				<Dialog fullScreen open={this.state.tagDialogOpen} TransitionComponent={Transition}>
					<TagSelectionPage onClose={this.handleTagClose} currentTags={this.state.memoTags} />
				</Dialog>
				<Prompt when={this.state.blockPageLeave} message={strings.leaveContent} />
			</Fragment>
		)
	}
}

export default RecordPage;
