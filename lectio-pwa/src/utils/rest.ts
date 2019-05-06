/**
 * API connectors
 */

import {API_ENP_MEMO, API_ENP_SEARCH, API_URL, AUTH_URL, SESSION_STORE_TOKEN} from '../constants';

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
		'Authorization': `Bearer ${sessionStorage.getItem(SESSION_STORE_TOKEN)}`,
		'Content-Type': 'application/json'
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

/**
 * Search for memos by a keyword and tags
 * @param {string} keyword
 * @param {Array<MemoTag>} tags?
 */
export const searchMemos = (keyword: string, tags?: serverMemoTag) => {
	const param_tags = tags === undefined || tags.length === 0 ? '' : 'tags=' + tags.toString();
	const separator = keyword && keyword.length > 0 ? '?' : '';

	return fetch(`${API_URL}/${API_ENP_SEARCH}/${keyword}${separator}${param_tags}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Authorization': `Bearer ${sessionStorage.getItem(SESSION_STORE_TOKEN)}`
		}
	});
};
