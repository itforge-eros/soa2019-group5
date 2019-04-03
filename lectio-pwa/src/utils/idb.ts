import {DB_NAME} from '../constants';

export const openConnection = new Promise((resolve, reject) => {
	const request = indexedDB.open(DB_NAME, 2);
	request.onerror = (event) => {
		reject(event);
	};
	request.onupgradeneeded = (event) => {
		console.log('db onupgradeneeded');
		// @ts-ignore
		const db = event.target.result;
		const objectStore = db.createObjectStore('memo', { keyPath: 'id' });
		objectStore.createIndex('name', 'name', { unique: false });
		objectStore.createIndex('content', 'content', { unique: false });
		objectStore.createIndex('audio', 'audio', { unique: false });
		objectStore.createIndex('tags', 'tags', { unique: false });
	};
	request.onsuccess = (event) => {
		console.log('db onsuccess');
		resolve();
	};
});
