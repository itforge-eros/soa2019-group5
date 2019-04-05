import {DB_NAME, DB_VERSION} from '../constants';

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
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onerror = (event) => {
			reject(event);
		};
		request.onupgradeneeded = (event) => {
			console.log('Upgrading DB');
			// @ts-ignore
			this.db = event.target.result;
			const memoStore = this.db.createObjectStore('memo', { keyPath: 'id' });
			memoStore.createIndex('name', 'name', { unique: false });
			memoStore.createIndex('content', 'content', { unique: false });
			// memoStore.createIndex('audio', 'audio', { unique: true });
			memoStore.createIndex('tags', 'tags', { unique: false });
			const memoAudioStore = this.db.createObjectStore('memoAudio', { keyPath: 'id' });
			memoAudioStore.createIndex('blob', 'blob', { unique: false });
		};
		request.onsuccess = (event) => {
			// @ts-ignore
			this.db = event.target.result;
			resolve();
		};
	});


	public saveToDB = (objType: IdbStoreType, data: any) => new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onsuccess = (event) => {
			// @ts-ignore
			const db = event.target.result;
			const t = db.transaction([objType], 'readwrite')
				.objectStore('memo')
				.add(data);
			t.onsuccess = (event: Event) => {
				resolve(event);
			};
			t.onerror = (event: Event) => {
				reject(event);
			};
		};
	});
}

export default Idb;
