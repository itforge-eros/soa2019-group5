import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import HomePage from './containers/HomePage';
import MemoPage from './containers/MemoPage';
import './App.sass';
import SummaryPage from "./containers/SummaryPage";

class App extends Component {
	render() {
		return (
			<HashRouter>
				<div className="App">
					<Route exact path="/" component={HomePage} />
					<Route exact path="/memo" component={MemoPage} />
					<Route exact path="/memo/summary" component={SummaryPage} />
				</div>
			</HashRouter>
		);
	}
}

export default App;
