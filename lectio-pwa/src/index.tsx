import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Idb from "./utils/Idb";
import ErrorPage from "./containers/ErrorPage";
import {login} from './utils/rest';
import {SESSION_STORE_TOKEN} from './constants';

const idb = Idb.getInstance();

idb.openConnection
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

login('admin', 'admin')
	.then((res) => {
		console.log('Login complete');
		return res.json();
	})
	.then((jsonRes) => {
		sessionStorage.setItem(SESSION_STORE_TOKEN, jsonRes.access_token);
	})
	.catch((res) => console.log(res));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
