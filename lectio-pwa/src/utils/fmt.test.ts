import * as Fmt from './fmt';

it ('separates list items with commas', () => {
	const result = Fmt.listWithCommas(['cat', 'dog', 'fish']);
	expect(result).toEqual('cat, dog, fish');
});
