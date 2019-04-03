export const openConnection = new Promise((resolve, reject) => {
	const request = indexedDB.open('lectio-pwa');
	request.onsuccess = (event) => {
		resolve();
	};
	request.onerror = (event) => {
		reject();
	};
});
