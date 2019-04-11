import {DB_NAME, DB_VERSION, IdbStoreType} from '../constants';
import Memo from '../model/Memo';
import MemoAudio from '../model/MemoAudio';

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
		// Will open exactly one connection
		if (this.db === undefined) {
			const request = indexedDB.open(DB_NAME, DB_VERSION);
			request.onerror = (event) => {
				reject(event);
			};
			request.onupgradeneeded = (event) => {
				console.log('Upgrading DB');
				// @ts-ignore
				this.db = event.target.result;
				const memoStore = this.db.createObjectStore(IdbStoreType.memo, {keyPath: 'id'});
				memoStore.createIndex('name', 'name', {unique: false});
				memoStore.createIndex('content', 'content', {unique: false});
				memoStore.createIndex('audioId', 'audioId', {unique: true});
				memoStore.createIndex('tags', 'tags', {unique: false});
				const memoAudioStore = this.db.createObjectStore(IdbStoreType.memoAudio, {keyPath: 'id'});
				memoAudioStore.createIndex('blob', 'blob', {unique: false});
			};
			request.onsuccess = (event) => {
				// @ts-ignore
				this.db = event.target.result;
				resolve();
			};
		} else {
			resolve();
		}
	});


	public saveToDB = (objType: IdbStoreType, data: Memo | MemoAudio) => new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onsuccess = (event) => {
			// @ts-ignore
			const db = event.target.result;
			const t = db.transaction(objType, 'readwrite')
				.objectStore(objType)
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
