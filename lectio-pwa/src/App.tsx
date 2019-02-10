import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import HomePage from './containers/HomePage';
import './App.sass';

class App extends Component {
	render() {
		return (
			<HashRouter>
				<div className="App">
					<Route path="/" component={HomePage} />
				</div>
			</HashRouter>
		);
	}
}

export default App;
