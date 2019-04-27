import {DB_NAME, DB_VERSION, IdbStoreType} from '../constants';
import Memo from '../model/Memo';
import MemoAudio from '../model/MemoAudio';

/**
 * IndexedDB utility
 */
class Idb {
	private static idb: Idb;
	// @ts-ignore
	private db: IDBDatabase;

	private constructor() {
		Idb.idb = this;
	}

	/**
	 * Get an Idb instance
	 * @return {Idb} An Idb instance
	 */
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

				// DB_VERSION 7
				if (event.oldVersion < 7) {
					const transcriptStore = this.db.createObjectStore(IdbStoreType.transcript, {keyPath: 'id'});
					transcriptStore.createIndex('transcript', 'transcript');
					transcriptStore.createIndex('summary', 'summary');
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

	/**
	 * Save a new object to DB
	 * @param {IdbStoreType} objType - Type of the object to save
	 * @param {Memo | MemoAudio | MemoTag | MemoTranscript} data - Data to save
	 */
	public saveToDB = (
		objType: IdbStoreType,
		data: Memo | MemoAudio | MemoTag | MemoTranscript
	) => new Promise((resolve, reject) => {
		const r: IDBRequest = this.db.transaction(objType, 'readwrite').objectStore(objType).add(data);
		r.onsuccess = (event: Event) => resolve(event);
		r.onerror = (event: Event) => reject(event);
	});

	/**
	 * Update an object to DB
	 * @param {IdbStoreType} objType - Type of the object to update
	 * @param {Memo | MemoAudio | MemoTag | MemoTranscript} data - Data to save
	 */
	public updateToDB = (
		objType: IdbStoreType,
		data: Memo | MemoAudio | MemoTag | MemoTranscript
	) => new Promise((resolve, reject) => {
		const s: IDBObjectStore = this.db.transaction(objType, 'readwrite').objectStore(objType);
		const r: IDBRequest = s.put(data);
		r.onsuccess = ev => resolve(ev);
		r.onerror = ev => reject(ev);
	});

	/**
	 * Get one or all objects of a specific type
	 * @param {IDBObjectStore} objType - An object type to get
	 * @param {string} id - An ID of the object to get
	 */
	public getFromDB = (objType: IdbStoreType, id?: string) => new Promise((resolve, reject) => {
		const s: IDBObjectStore = this.db.transaction(objType).objectStore(objType);
		let r: IDBRequest;
		if (id) r = s.get(id); else r = s.getAll();
		r.onsuccess = (event: Event) => resolve(event);
		r.onerror = (event: Event) => reject(event);
	});

	/**
	 * Delete a specified item
	 * @param {IdbStoreType} objType - An object type to delete
	 * @param {string} id - An ID of the object to delete
	 */
	public deleteFromDB = (objType: IdbStoreType, id: string) => new Promise((resolve, reject) => {
		const s: IDBObjectStore = this.db.transaction(objType, 'readwrite').objectStore(objType);
		let r: IDBRequest = s.delete(id);
		r.onsuccess = ev => resolve(ev);
		r.onerror = ev => reject(ev);
	});
}

export default Idb;
