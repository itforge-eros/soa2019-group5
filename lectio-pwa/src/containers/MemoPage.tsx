import React, { Component, Fragment } from 'react';
import {AppBar, Button, Chip, Fab, IconButton, Toolbar, Typography} from '@material-ui/core';
import { Add as AddIcon, ArrowBack, Delete, ScatterPlot } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import styles from './MemoPage.module.sass';
import PlaybackControl from "../components/PlaybackControl";

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
	}

	private handleBackBtn() {
		setTimeout(() => this.props.history.push('/'), 180);
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
						<div className={styles.grow}></div>
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
							Memo name here
						</Typography>
						<p className="bodyText">lorem ipsum</p>
						<div className={styles.chipWrap}>
							<Chip label="Demo tag" className={styles.chip} />
							<Button onClick={() => this.handleTagBtn()}>
								<AddIcon fontSize="small" />
							</Button>
						</div>
					</div>
					<PlaybackControl />
				</div>
			</Fragment>
		);
	}
}

export default withRouter(MemoPage);
