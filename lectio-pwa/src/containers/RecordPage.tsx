import React, {Component, Fragment} from 'react';
import {AppBar, Button, Chip, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Add as AddIcon, ArrowBack, Save} from '@material-ui/icons';
import styles from './MemoPage.module.sass';
import RecordControl from "../components/RecordControl";

interface State {
	memoName: string,
	memoBody: string,
	memoTags: Array<any>
}

const inlineStyles = {
	toolbar: {
		paddingLeft: '8px',
		paddingRight: '8px',
		backgroundColor: '#fff'
	},
};

class RecordPage extends Component<any, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			memoName: `Memo ${new Date().toLocaleString()}`,
			memoBody: 'lorem ipsum',
			memoTags: [
				{ name: 'Demo tag' }
			]
		}
	}

	private handleBackBtn() {
		setTimeout(() => this.props.history.goBack(), 180);
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
							<Button onClick={() => this.handleTagBtn()}>
								<AddIcon fontSize="small" />
							</Button>
						</div>
					</div>
					<RecordControl />
				</div>
			</Fragment>
		)
	}
}

export default RecordPage;
