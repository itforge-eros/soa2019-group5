import React, { Component, Fragment } from 'react';
import {AppBar, Button, Chip, Fab, IconButton, Toolbar, Typography} from '@material-ui/core';
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
};

class MemoPage extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			memo: undefined
		};
	}

	componentDidMount(): void {
		const memoId = this.props.match.params.id;
		const idb = Idb.getInstance();
		idb.getMemo(memoId)
			.then((event) => {
				// @ts-ignore
				this.setState({ memo: event.target.result })
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
						<Typography variant="h6">
							{ this.state.memo ? this.state.memo.name : '' }
						</Typography>
						<p className="bodyText">
							{ this.state.memo ? this.state.memo.content : '' }
						</p>
						{this.state.memo &&
						<div className={styles.chipWrap}>
							{this.state.memo.tags.map((tag: any) =>
								<Chip key={tag.name} label={tag.name} className={styles.chip}/>
							)}
							<Button onClick={() => this.handleTagBtn()}>
								<AddIcon fontSize="small" />
							</Button>
						</div>}
					</div>
					<PlaybackControl />
				</div>
			</Fragment>
		);
	}
}

export default withRouter(MemoPage);
