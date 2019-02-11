import React, { Component } from 'react';
import { Toolbar, Typography, AppBar } from '@material-ui/core';
import './HomePage.sass';

const styles = {
	header: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: '16px',
		paddingRight: '16px',
		paddingTop: '16px',
		minHeight: '64px'
	}
}

class HomePage extends Component {
  render() {
		return (
			<div className="header" style={styles.header}>
				<Typography variant="h5">Recordings</Typography>
			</div>
		)
  }
}

export default HomePage;
