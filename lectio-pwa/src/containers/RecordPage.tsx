import React, {ChangeEvent, Component, Fragment} from 'react';
import {AppBar, Button, Chip, IconButton, InputBase, Toolbar, Typography} from '@material-ui/core';
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

type State = {
	memoId: string,
	memoName: string,
	memoBody: string,
	memoTags: Array<any>,
	dialogOpen: boolean,
	blockPageLeave: boolean
}

const inlineStyles = {
	toolbar: {
		paddingLeft: '8px',
		paddingRight: '8px',
		backgroundColor: '#fff'
	},
};

class RecordPage extends Component<any, State> {
	recordControl: React.RefObject<RecordControl>;
	defaultMemoName: string = `Memo ${new Date().toLocaleString()}`;

	constructor(props: any) {
		super(props);
		this.recordControl = React.createRef();
		this.state = {
			memoId: new Date().getTime().toString(),
			memoName: this.defaultMemoName,
			memoBody: 'lorem ipsum',
			memoTags: [
				{ name: 'Demo tag' }
			],
			dialogOpen: false,
			blockPageLeave: true
		};
		this.handleDialogNo = this.handleDialogNo.bind(this);
		this.handleDialogYes = this.handleDialogYes.bind(this);
		this.handleSaveBtn = this.handleSaveBtn.bind(this);
		this.handleMemoNameChange = this.handleMemoNameChange.bind(this);
	}

	private handleSaveBtn(): void {
		// Set a reference to RecordControl instance
		let rc = this.recordControl.current;
		// Prevent null
		if (rc) {
			rc.getRecording((blobEvent: any) => {
				const idb = Idb.getInstance();
				const finalMemoName =
					this.state.memoName.replace(/\s/g, '') === '' ?
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

	private handleTagBtn() {
		const currentPath: string = this.props.location.pathname;
		setTimeout(() => this.props.history.push(`${currentPath}/tags/`), 180);
	}

	private handleDialogOpen() {
		this.setState({ dialogOpen: true });
	}

	private handleDialogNo() {
		this.setState({ dialogOpen: false });
	}

	private handleDialogYes() {
		this.setState({ dialogOpen: false, blockPageLeave: false });
		setTimeout(() => this.props.history.goBack(), 180);
	}

	private handleMemoNameChange(event: ChangeEvent) {
		// @ts-ignore
		this.setState({ memoName: event.target.value });
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
						<InputBase onChange={this.handleMemoNameChange} placeholder={this.state.memoName} className={styles.memoTitle} fullWidth />
						<p className="bodyText">{ this.state.memoBody }</p>
						<div className={styles.chipWrap}>
							{this.state.memoTags.map(tag => (
								<Chip label={tag.name} className={styles.chip} />
							))}
							<Button>
								<AddIcon fontSize="small" />
							</Button>
						</div>
					</div>
					<RecordControl ref={this.recordControl} />
				</div>
				<Dialog open={this.state.dialogOpen}>
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
				<Prompt when={this.state.blockPageLeave} message="Do you want to discard recording?" />
			</Fragment>
		)
	}
}

export default RecordPage;
