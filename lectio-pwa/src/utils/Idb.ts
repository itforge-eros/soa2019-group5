import {DB_NAME} from '../constants';

class Idb {
	private static idb: Idb;

	private constructor() {
		Idb.idb = this;
	}

	public static getInstance(): Idb {
		if (this.idb) return this.idb;
		else this.idb = new Idb();
		return this.idb;
	}

	public openConnection = new Promise((resolve, reject) => {
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
}

/* export const saveToDB = (objType: string, data: any): Promise<any> => {
	new Promise((resolve, reject) => {

	})
};*/

export default Idb;
