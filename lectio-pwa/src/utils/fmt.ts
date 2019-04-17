/**
 * Formatter utilities for strings and the likes
 */

/**
 * Formats an array into a comma-separated list
 * @param list - An array of items
 */
export const listWithCommas = (list: Array<string>) : string => {
	let result = '';
	list.forEach((item, index) => result += item + (index < list.length - 1 ? ', ' : ''));
	return result;
};

/**
 * Formats a second into mm:ss
 * @param second - A second to format
 */
export const secToHuman = (second: number) : string => {
	let tempSec = second;
	const m = Math.floor(second / 60);
	tempSec -= 60 * m;
	const s = tempSec;
	return `${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}`;
};
