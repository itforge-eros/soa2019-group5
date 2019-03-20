import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import HomePage from './containers/HomePage';
import MemoPage from './containers/MemoPage';
import './App.sass';
import SummaryPage from "./containers/SummaryPage";
import TagSelectionPage from "./containers/TagSelectionPage";
import RecordPage from "./containers/RecordPage";

class App extends Component {
	render() {
		return (
			<HashRouter>
				<div className="App">
					<Route exact path="/" component={HomePage} />
					<Route exact path="/memo" component={MemoPage} />
					<Route exact path="/memo/summary" component={SummaryPage} />
					<Route exact path="/memo/tags" component={TagSelectionPage} />
					<Route exact path="/record" component={RecordPage} />
				</div>
			</HashRouter>
		);
	}
}

export default App;
