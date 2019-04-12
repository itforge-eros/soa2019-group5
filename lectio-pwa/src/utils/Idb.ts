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

				// DB_VERSION 5
				if (event.oldVersion < 5) {
					const memoStore = this.db.createObjectStore(IdbStoreType.memo, {keyPath: 'id'});
					memoStore.createIndex('name', 'name', {unique: false});
					memoStore.createIndex('content', 'content', {unique: false});
					memoStore.createIndex('audioId', 'audioId', {unique: true});
					memoStore.createIndex('tags', 'tags', {unique: false});
					const memoAudioStore = this.db.createObjectStore(IdbStoreType.memoAudio, {keyPath: 'id'});
					memoAudioStore.createIndex('blob', 'blob', {unique: false});
				}

				// DB_VERSION 6
				if (event.oldVersion < 6) {
					const tagStore = this.db.createObjectStore(IdbStoreType.tag, {keyPath: 'id'});
					tagStore.createIndex('name', 'name', {unique: true});
				}
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

	/**
	 * Get a specific memo or all memos
	 * @param id - A memo ID (leave blank to get all memos)
	 */
	public getMemo = (id?: number) => new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onsuccess = (event) => {
			// @ts-ignore
			const db = event.target.result;
			const s: IDBObjectStore = db.transaction(IdbStoreType.memo).objectStore(IdbStoreType.memo);
			let r: IDBRequest;
			if (id) r = s.get(id); else r = s.getAll();
			r.onsuccess = (event: Event) => resolve(event);
			r.onerror = (event: Event) => reject(event);
		}
	});

	/**
	 * Update an existing memo
	 * @param memo - An updated Memo object
	 */
	public updateMemo = (memo: Memo) => new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onsuccess = ev => {
			// @ts-ignore
			const db = ev.target.result;
			const s: IDBObjectStore = db.transaction(IdbStoreType.memo, 'readwrite').objectStore(IdbStoreType.memo);
			const r: IDBRequest = s.put(memo);
			r.onsuccess = ev => resolve(ev);
			r.onerror = ev => reject(ev);
		}
	});

	public saveTag = (tag: MemoTag) => new Promise((resolve, reject) => {
		const s: IDBObjectStore = this.db.transaction(IdbStoreType.tag, 'readwrite').objectStore(IdbStoreType.tag);
		const r: IDBRequest = s.add(tag);
		r.onsuccess = ev => resolve(ev);
		r.onerror = ev => reject(ev);
	});

	/**
	 * Get a specific tag or all tags
	 * @param id - A tag ID (leave blank to get all tags)
	 */
	public getTag = (id?: string) => new Promise((resolve, reject) => {
		const s: IDBObjectStore = this.db.transaction(IdbStoreType.tag).objectStore(IdbStoreType.tag);
		let r: IDBRequest;
		if (id) r = s.get(id); else r = s.getAll();
		r.onsuccess = (event: Event) => resolve(event);
		r.onerror = (event: Event) => reject(event);
	});
}

export default Idb;
