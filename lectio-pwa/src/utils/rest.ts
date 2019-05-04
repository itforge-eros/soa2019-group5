/**
 * API connectors
 */

import Memo from '../model/Memo';
import {API_ENP_MEMO, API_ENP_SEARCH, API_URL, AUTH_URL, SESSION_STORE_TOKEN} from '../constants';
import * as Fmt from './fmt';

const mockData = [
	{
		"uuid": "abc",
		"title":"CNN with Python",
		"content":"Computer Vision has become ubiquitous in our society, with applications in search, ...",
		"summary":"This course is a deep dive into details of the deep learning architecture with a focus on learning.",
		"tags":[
			"science",
			"programming"
		],
		"created_time":"2019-02-12T08:22:06.286Z",
		"updated_time":"2019-02-12T08:22:06.286Z"
	}, {
		"uuid": "def",
		"title":"Markdown for dummy",
		"content":"Markdown is a lightweight markup language with plain text formatting syntax.",
		"summary":"Markdown is often used to format readme files, for writing messages in online discussion forums.",
		"tags":[
			"github",
			"markdown"
		],
		"created_time":"2019-02-12T08:22:06.286Z",
		"updated_time":"2019-02-12T08:22:06.286Z"
	}
];

const loginParams = {
	response_type: 'token',
	redirect_url: 'https://google.com',
	client_id: 'lectio-pwa'
};

/**
 * Send a login request and retrieve a token. Please store it in sessionStorage.
 * @param username
 * @param password
 */
export const login = (username: string, password: string) => fetch(AUTH_URL, {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({ username, password })
});

/**
 * Get all memos from the server
 */
export const getAllMemos = () => fetch(`${API_URL}/${API_ENP_MEMO}`, {
	method: 'GET',
	mode: 'cors',
	headers: {
		'Authorization': `Bearer ${sessionStorage.getItem(SESSION_STORE_TOKEN)}`
	}
});

/**
 * Get a memo from the server
 * @param memoId
 */
export const getMemo = (memoId: string) => fetch(`${API_URL}/${API_ENP_MEMO}/${memoId}`, {
	method: 'GET',
	mode: 'cors',
	headers: {
		'Authorization': `Bearer ${sessionStorage.getItem(SESSION_STORE_TOKEN)}`
	}
});

/**
 * Create a new memo on the server
 * @param {serverMemo} memo?
 */
export const createMemo = (memo?: serverMemo) => fetch(`${API_URL}/${API_ENP_MEMO}`, {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Authorization': `Bearer ${sessionStorage.getItem(SESSION_STORE_TOKEN)}`
	},
	body: JSON.stringify(memo)
});

/**
 * Update a specified memo on the server
 * @param memoId - An ID of the memo to update
 * @param {serverMemo} memo - New memo data
 */
export const updateMemo = (memoId: string, memo: serverMemo) => fetch(`${API_URL}/${API_ENP_MEMO}/${memoId}`, {
	method: 'PUT',
	mode: 'cors',
	headers: {
		'Authorization': `Bearer ${sessionStorage.getItem(SESSION_STORE_TOKEN)}`,
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(memo)
});

/**
 * Delete a specified memo from the server
 * @param memoId
 */
export const deleteMemo = (memoId: string) => fetch(`${API_URL}/${API_ENP_MEMO}/${memoId}`, {
	method: 'DELETE',
	mode: 'cors',
	headers: {
		'Authorization': `Bearer ${sessionStorage.getItem(SESSION_STORE_TOKEN)}`
	}
});

export const searchMemos = (keyword: string, tags?: serverMemoTag) => {
	const param_tags = tags === undefined ? '' : tags.toString();
	return fetch(`${API_URL}/${API_ENP_SEARCH}/${keyword}?${param_tags}`);

	// stub
	// return new Promise(resolve => resolve(mockData));
};
