import React, {ChangeEvent, Component, Fragment} from 'react';
import {AppBar, Button, Chip, IconButton, InputBase, Slide, Toolbar, Typography} from '@material-ui/core';
import {Add as AddIcon, ArrowBack, Save} from '@material-ui/icons';
import styles from './MemoPage.module.sass';
import RecordControl from "../components/RecordControl";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Prompt} from "react-router-dom";
import Idb from '../utils/Idb';
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
	tagDialogOpen: boolean
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

const Transition = (props: any) => <Slide direction="up" {...props} />;

class RecordPage extends Component<any, theState> {
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
			tagDialogOpen: false
		};
		this.handleDialogNo = this.handleDialogNo.bind(this);
		this.handleDialogYes = this.handleDialogYes.bind(this);
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
				const idb = Idb.getInstance();
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
				idb.saveToDB(IdbStoreType.memoAudio, memoAudioToSave)
					.then(() => {
						idb.saveToDB(IdbStoreType.memo, memoToSave)
							.then(() => {
								this.setState({ blockPageLeave: false });
								this.props.history.replace('/');
							})
							.catch((event: any) => console.log(event.target));
					})
					.catch((error: any) => {
						console.log(error);
					});
			});
		}
	}

	private handleBackBtn() {
		this.handleDialogOpen();
	}

	private handleTagOpen() {
		this.setState({ tagDialogOpen: true });
	}

	private handleTagClose(newTags: Array<MemoTag>): void {
		this.setState({ tagDialogOpen: false, memoTags: newTags });
	}

	private handleDialogOpen() {
		this.setState({ backDialogOpen: true });
	}

	private handleDialogNo() {
		this.setState({ backDialogOpen: false });
	}

	private handleDialogYes() {
		this.setState({ backDialogOpen: false, blockPageLeave: false });
		setTimeout(() => this.props.history.goBack(), 180);
	}

	private handleMemoNameChange(event: ChangeEvent): void {
		// @ts-ignore
		this.setState({ memoName: event.target.value });
	}

	private handleMemoBodyChange(event: ChangeEvent): void {
		// @ts-ignore
		this.setState({ memoBody: event.target.value });
	}

	render() {
		return (
			<Fragment>
				<AppBar position="fixed" color="default" elevation={0}>
					<Toolbar style={inlineStyles.toolbar}>
						<IconButton onClick={() => this.handleBackBtn()}>
							<ArrowBack />
						</IconButton>
						<div className="grow"/>
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
						           className="bodyText"
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
					<DialogTitle>Discard memo?</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Do you want to <strong>discard</strong> this memo?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button color="primary" onClick={this.handleDialogYes}>Yes</Button>
						<Button color="primary" onClick={this.handleDialogNo}>No</Button>
					</DialogActions>
				</Dialog>
				<Dialog fullScreen open={this.state.tagDialogOpen} TransitionComponent={Transition}>
					<TagSelectionPage onClose={this.handleTagClose} currentTags={this.state.memoTags} />
				</Dialog>
				<Prompt when={this.state.blockPageLeave} message="Do you want to discard recording?" />
			</Fragment>
		)
	}
}

export default RecordPage;
