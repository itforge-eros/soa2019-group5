export const DB_NAME: string = 'lectio-pwa';
export const DB_VERSION: number = 7;

export const SESSION_STORE_TOKEN: string = 'lectio-token';

export const API_URL: string = 'http://api.lectio.itforge.io';
export const API_ENP_MEMO: string = 'memos';

export const AUTH_URL: string = 'https://asia-northeast1-kavinvin-211411.cloudfunctions.net/signin';

export enum IdbStoreType {
	memo = 'memo',
	memoAudio = 'memoAudio',
	tag = 'tag',
	transcript = 'transcript'
}
