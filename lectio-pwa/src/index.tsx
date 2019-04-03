import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {openConnection} from "./utils/idb";
import ErrorPage from "./containers/ErrorPage";

openConnection
	.then(() => {
		ReactDOM.render(<App />, document.getElementById('root'));
	})
	.catch(() => {
		ReactDOM.render(
			<ErrorPage
				identifier="db_err"
				title="Database error"
				body="Cannot connect to application database" />,
			document.getElementById('root'));
	});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
