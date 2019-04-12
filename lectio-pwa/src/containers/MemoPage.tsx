import React, {ChangeEvent, Component, Fragment} from 'react';
import {AppBar, Button, Chip, Fab, IconButton, InputBase, Toolbar, Typography} from '@material-ui/core';
import { Add as AddIcon, ArrowBack, Delete, ScatterPlot } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import styles from './MemoPage.module.sass';
import PlaybackControl from "../components/PlaybackControl";
import Idb from '../utils/Idb';
import Memo from '../model/Memo';

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

class MemoPage extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			memo: new Memo('', '', '', '', []),
			memoName: '',
			memoBody: '',
			memoTags: [],
		};
		this.handleMemoNameChange = this.handleMemoNameChange.bind(this);
		this.handleMemoBodyChange = this.handleMemoBodyChange.bind(this);
	}

	componentDidMount(): void {
		const memoId = this.props.match.params.id;
		const idb = Idb.getInstance();
		idb.getMemo(memoId)
			.then((event) => {
				// @ts-ignore
				const memo: Memo = event.target.result;
				this.setState({
					memoName: memo.name,
					memoBody: memo.content,
					memoTags: memo.tags,
				});
			})
			.catch((event) => console.log(event));
	}

	private handleBackBtn() {
		setTimeout(() => this.props.history.goBack(), 180);
	}

	private handleSummaryBtn() {
        const currentPath: string = this.props.location.pathname;
        setTimeout(() => this.props.history.push(`${currentPath}/summary/`), 180);
	}

	private handleTagBtn() {
        const currentPath: string = this.props.location.pathname;
        setTimeout(() => this.props.history.push(`${currentPath}/tags/`), 180);
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
						<IconButton>
							<Delete />
						</IconButton>
						<IconButton onClick={() => this.handleSummaryBtn()}>
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
						{this.state.memo &&
							<div className={styles.chipWrap}>
								{this.state.memo.tags.map((tag: any) =>
									<Chip key={tag.name} label={tag.name} className={styles.chip}/>
								)}
								<Button onClick={() => this.handleTagBtn()}>
									<AddIcon fontSize="small" />
								</Button>
							</div>
						}
					</div>
					<PlaybackControl />
				</div>
			</Fragment>
		);
	}
}

export default withRouter(MemoPage);
