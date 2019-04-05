import React, {Component, Fragment} from 'react';
import {AppBar, Button, Chip, IconButton, Toolbar, Typography} from '@material-ui/core';
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

type State = {
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

	constructor(props: any) {
		super(props);
		this.recordControl = React.createRef();
		this.state = {
			memoName: `Memo ${new Date().toLocaleString()}`,
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
	}

	private handleSaveBtn(): void {
		// Set a reference to RecordControl instance
		let rc = this.recordControl.current;
		// Prevent null
		if (rc) {
			rc.getRecording((blobEvent: any) => {
				console.log(blobEvent.data);
				const idb = Idb.getInstance();
				idb.saveToDB(IdbStoreType.memo, { id: '1', name: 'lel', content: 'ccc', tags: ['t1', 't2'], audioId: '1' })
					.then((event: any) => console.log('saved'))
					.catch((event: any) => console.log(event.target));
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
						<Typography variant="h6">{ this.state.memoName }</Typography>
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
