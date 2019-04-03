import {DB_NAME} from '../constants';

export const openConnection = new Promise((resolve, reject) => {
	const request = indexedDB.open(DB_NAME);
	request.onsuccess = (event) => {
		resolve();
	};
	request.onerror = (event) => {
		reject(event);
	};
});
