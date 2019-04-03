import React, {Component, Fragment} from 'react';
import {Grid} from "@material-ui/core";

type ErrorPageProps = {
	identifier: string,
	title: string,
	body: string
}

class ErrorPage extends Component<ErrorPageProps, any> {
	constructor(props: ErrorPageProps) {
		super(props);
	}

	render() {
		return (
			<Fragment>
				<Grid container direction="column" justify="center" alignItems="center">
					<h1>{ this.props.title }</h1>
					<p>{ this.props.body }</p>
				</Grid>
			</Fragment>
		);
	}
}

export default ErrorPage;
