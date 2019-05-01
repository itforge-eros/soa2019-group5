/**
 * API connectors
 */

import Memo from '../model/Memo';
import {API_ENP_MEMO, API_URL, AUTH_URL, SESSION_STORE_TOKEN} from '../constants';
import * as Fmt from './fmt';

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
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	redirect: 'manual',
	body: Fmt.objectToQueryParams({ ...loginParams, username, password })
});

/**
 * Create a new memo on the server
 * @param memo
 */
export const createMemo = (memo: Memo) => fetch(`${API_URL}/${API_ENP_MEMO}`, {
	method: 'POST',
	headers: {
		'Authentication': `Bearer ${sessionStorage.getItem(SESSION_STORE_TOKEN)}`
	},
	body: JSON.stringify(memo)
});

/**
 * Update a specified memo on the server
 * @param memoId - An ID of the memo to update
 * @param memo - New memo data
 */
export const updateMemo = (memoId: string, memo: Memo) => fetch(`${API_URL}/${API_ENP_MEMO}`, {
	method: 'PUT',
	headers: {
		'Authentication': `Bearer ${sessionStorage.getItem(SESSION_STORE_TOKEN)}`
	},
	body: JSON.stringify(memo)
});
