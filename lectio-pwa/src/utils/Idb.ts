import {DB_NAME} from '../constants';

class Idb {
	private static idb: Idb;
	// @ts-ignore
	private db: IDBDatabase;

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
			this.db = event.target.result;
			const objectStore = this.db.createObjectStore('memo', { keyPath: 'id' });
			objectStore.createIndex('name', 'name', { unique: false });
			objectStore.createIndex('content', 'content', { unique: false });
			// objectStore.createIndex('audio', 'audio', { unique: false }); AUDIO WILL BE KEPT IN ANOTHER STORE
			objectStore.createIndex('tags', 'tags', { unique: false });
		};
		request.onsuccess = (event) => {
			console.log('db onsuccess');
			// @ts-ignore
			this.db = event.target.result;
			resolve();
		};
	});

	/*public saveToDB = (objType: string, data: any): Promise<any> => {
		new Promise((resolve, reject) => {

		})
	};*/
}

export default Idb;
