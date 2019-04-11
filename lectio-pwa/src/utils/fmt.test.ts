import * as Fmt from './fmt';

it ('separates list items with commas', () => {
	const result = Fmt.listWithCommas(['cat', 'dog', 'fish']);
	expect(result).toEqual('cat, dog, fish');
});

it ('formats a second into mm:ss', () => {
	const result = Fmt.msToHuman(59);
	expect(result).toEqual('00:59');
});

it ('formats a second into mm:ss', () => {
	const result = Fmt.msToHuman(60);
	expect(result).toEqual('01:00');
});

it ('formats a second into mm:ss', () => {
	const result = Fmt.msToHuman(61);
	expect(result).toEqual('01:01');
});
