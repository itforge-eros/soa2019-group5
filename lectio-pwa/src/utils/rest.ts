/**
 * API connectors
 */

import Memo from '../model/Memo';
import {API_ENP_MEMO, API_URL, AUTH_URL} from '../constants';
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
	body: Fmt.objectToQueryParams({
		...loginParams, username, password
	})
});

export const createMemo = (body: Memo) => fetch(`${API_URL}/${API_ENP_MEMO}`, {method: 'POST'});