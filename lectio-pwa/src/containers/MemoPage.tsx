import React, { Component, Fragment } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { ArrowBack, Delete, ScatterPlot } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import styles from './MemoPage.module.sass';

class MemoPage extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	handleBackBtn() {
		setTimeout(() => this.props.history.push('/'), 200);
	}

	render() {
		return (
			<Fragment>
				<AppBar position="fixed" color="default">
					<Toolbar>
						<IconButton onClick={() => this.handleBackBtn()}>
							<ArrowBack />
						</IconButton>
						<div className={styles.grow}></div>
						<IconButton>
							<Delete />
						</IconButton>
						<IconButton>
							<ScatterPlot />
						</IconButton>
					</Toolbar>
				</AppBar>
				<div className={styles.contentArea}>
					<div className={styles.textArea}>
						<Typography variant="h6">
							Memo name here
						</Typography>
						<p>lorem ipsum</p>
					</div>
					<div className={styles.audioArea}></div>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(MemoPage);
