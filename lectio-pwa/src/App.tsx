import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import HomePage from './containers/HomePage';
import MemoPage from './containers/MemoPage';
import './App.sass';
import SummaryPage from "./containers/SummaryPage";
import TagSelectionPage from "./containers/TagSelectionPage";
import RecordPage from "./containers/RecordPage";
import SearchPage from "./containers/SearchPage";
import {openConnection} from './utils/idb';

class App extends Component {
	componentWillMount(): void {
		openConnection
			.then(() => alert('connected'))
			.catch(() => alert('rejected'));
	}

	render() {
		return (
			<HashRouter>
				<div className="App">
					<Route exact path="/" component={HomePage} />
					<Route exact path="/memo" component={MemoPage} />
					<Route exact path="/memo/summary" component={SummaryPage} />
					<Route exact path="/memo/tags" component={TagSelectionPage} />
					<Route exact path="/record" component={RecordPage} />
					<Route exact path="/search" component={SearchPage} />
				</div>
			</HashRouter>
		);
	}
}

export default App;
