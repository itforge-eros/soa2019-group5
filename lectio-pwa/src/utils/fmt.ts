export const listWithCommas = (list: Array<string>) : string => {
	let result = '';
	list.forEach((item, index) => result += item + (index < list.length - 1 ? ', ' : ''));
	return result;
}
