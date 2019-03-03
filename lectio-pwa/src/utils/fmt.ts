/**
 * Formats an array into a comma-separated list
 * @param list - An array of items
 */
export const listWithCommas = (list: Array<string>) : string => {
	let result = '';
	list.forEach((item, index) => result += item + (index < list.length - 1 ? ', ' : ''));
	return result;
}
