import React, {ChangeEvent, Component, Fragment} from 'react';
import {AppBar, Button, Chip, Dialog, Fab, IconButton, InputBase, Slide, Toolbar, Typography} from '@material-ui/core';
import { Add as AddIcon, ArrowBack, Delete, ScatterPlot } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import styles from './MemoPage.module.sass';
import PlaybackControl from "../components/PlaybackControl";
import Idb from '../utils/Idb';
import Memo from '../model/Memo';
import TagSelectionPage from './TagSelectionPage';

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
	ariaBackBtn: 'Go back',
	ariaDeleteBtn: 'Delete this memo',
	ariaSummaryBtn: 'Show summary',
	ariaTagAdd: 'Manage tags'
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
			tagDialogOpen: false,
			deleteMemo: false
		};
		this.handleMemoNameChange = this.handleMemoNameChange.bind(this);
		this.handleMemoBodyChange = this.handleMemoBodyChange.bind(this);
		this.handleTagOpen = this.handleTagOpen.bind(this);
		this.handleTagClose = this.handleTagClose.bind(this);
	}

	componentDidMount(): void {
		const memoId = this.props.match.params.id;
		this.idb.getMemo(memoId)
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
			.catch((event) => console.log(event));
	}

	componentWillUnmount(): void {
		if (!this.state.deleteMemo) {
			const memo = new Memo(
				this.state.memoId,
				this.state.memoName,
				this.state.memoBody,
				this.state.memoAudioId,
				this.state.memoTags
			);
			this.idb.updateMemo(memo);
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
		this.idb.deleteMemo(this.state.memoId)
			.then(() => {
				this.idb.deleteMemoAudio(this.state.memoId);
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

	render() {
		return (
			<Fragment>
				<AppBar position="fixed" color="default" elevation={0}>
					<Toolbar style={inlineStyles.toolbar}>
						<IconButton onClick={() => this.handleBackBtn()} aria-label={strings.ariaBackBtn}>
							<ArrowBack />
						</IconButton>
						<div className="grow"/>
						<IconButton onClick={() => this.handleDeleteBtn()} aria-label={strings.ariaDeleteBtn}>
							<Delete />
						</IconButton>
						<IconButton onClick={() => this.handleSummaryBtn()} aria-label={strings.ariaSummaryBtn}>
							<ScatterPlot />
						</IconButton>
					</Toolbar>
				</AppBar>
				<div className={styles.contentArea}>
					<div className={styles.textArea}>
						<InputBase onChange={this.handleMemoNameChange}
						           value={this.state.memoName}
						           className={styles.memoTitle}
						           fullWidth />
						<InputBase onChange={this.handleMemoBodyChange}
						           value={this.state.memoBody}
						           className="bodyText"
						           style={inlineStyles.memoBody}
						           multiline fullWidth />
						<div className={styles.chipWrap}>
							{this.state.memoTags.map((tag: any) =>
								<Chip key={tag.name} label={tag.name} className={styles.chip}/>
							)}
							<Button onClick={this.handleTagOpen} aria-label={strings.ariaTagAdd}>
								<AddIcon fontSize="small" />
							</Button>
						</div>
					</div>
					<PlaybackControl />
				</div>
				<Dialog fullScreen open={this.state.tagDialogOpen} TransitionComponent={Transition}>
					<TagSelectionPage onClose={this.handleTagClose} currentTags={this.state.memoTags} />
				</Dialog>
			</Fragment>
		);
	}
}

export default withRouter(MemoPage);
