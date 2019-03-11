import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import HomePage from './containers/HomePage';
import MemoPage from './containers/MemoPage';
import './App.sass';

class App extends Component {
	render() {
		return (
			<HashRouter>
				<div className="App">
					<Route exact path="/" component={HomePage} />
					<Route exact path="/memo" component={MemoPage} />
				</div>
			</HashRouter>
		);
	}
}

export default App;
