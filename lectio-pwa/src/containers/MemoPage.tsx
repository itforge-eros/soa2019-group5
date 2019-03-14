import React, { Component, Fragment } from 'react';
import {AppBar, Button, Chip, Fab, IconButton, Toolbar, Typography} from '@material-ui/core';
import { Add as AddIcon, ArrowBack, Delete, ScatterPlot, PlayArrow } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import styles from './MemoPage.module.sass';

const inlineStyles = {
	toolbar: {
		paddingLeft: '8px',
		paddingRight: '8px',
		backgroundColor: '#fff'
	},
    fab: {
        position: 'absolute' as 'absolute',
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto'
    },
};

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
				<AppBar position="fixed" color="default" elevation={0}>
					<Toolbar style={inlineStyles.toolbar}>
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
						<div className={styles.chipWrap}>
							<Chip label="Demo tag" className={styles.chip} />
							<Button>
								<AddIcon fontSize="small" />
							</Button>
						</div>
					</div>
					<div className={styles.audioArea}>
                        <Fab color="primary" aria-label="Add" style={inlineStyles.fab}>
                            <PlayArrow />
                        </Fab>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(MemoPage);
