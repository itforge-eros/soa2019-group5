import React, { Component } from 'react';
import { Toolbar, Typography, AppBar } from '@material-ui/core';
import Header from '../components/Header';
import './HomePage.sass';

class HomePage extends Component {
  render() {
		return (
			<Header>
				<Typography variant="h5">Recordings</Typography>
			</Header>
		)
  }
}

export default HomePage;
