import React, { Component, Fragment } from 'react';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router-dom';

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
					</Toolbar>
				</AppBar>
				<p>lorem ipsum</p>
			</Fragment>
		);
	}
}

export default withRouter(MemoPage);
