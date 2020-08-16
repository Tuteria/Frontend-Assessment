import groupBy from "json-groupby";
//This function removes duplicates from an array of objects
//using the object key
type StringType = string | number;
export function getUnique(arr: Array<{ [K in StringType]: any }>, key: string) {
	const unique = arr
		.map((object: { [x: string]: any }) => object[key])

		// store the keys of the unique objects
		.map((e, i, final) => final.indexOf(e) === i && i)

		// eliminate the dead keys & store unique objects
		.filter((e) => typeof e == "number" && arr[e])
		.map((e) => typeof e == "number" && arr[e]);

	return unique;
}

export const isDefined = (elem: any) => typeof elem !== "undefined";

/**
 * Breaks an array into
 * @param {Array[*]} array The array that is to be grouped into smaller arrays
 * @param {String} size The maximum number of elements in each chunked array
 *
 * @returns {Array[Arrays]} An array of smaller, chunked arrays
 *
 * @example
 * chunkArray(["a","b","c","d"], 2)
 * //=> [["a","b"],["c","d"]]
 */
export function chunkArray(array: Array<any>, size: number) {
	const results = [];

	while (array.length > 0) results.push(array.splice(0, size));

	return results;
}

export function shuffle(array: Array<any>) {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/**
 * Returns the duplicate elements in an array
 * @param {Array} arr Array that has duplicate elements
 * @returns {Array} Duplicate elements
 */
export function getArrayDuplicates(arr: Array<any>) {
	return arr.filter((elem, index, array) => array.indexOf(elem) !== index);
}

/**
 * Checks if an array contains nested arrays or not.
 * @param {Array[]} arr
 * @returns {Boolean}
 * @example
 * isNestedArray([["a","b"],["c","d"]])
 * //=> true
 */
export function isNestedArray(arr: Array<any>) {
	const nestedArrays = arr.filter((item) => Array.isArray(item));
	return nestedArrays.length > 0;
}

export function scrollToTop(style: "auto" | "smooth" | undefined) {
	return window.scroll({
		top: 0,
		behavior: style ? style : "auto",
	});
}

export function capFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// This component renders a title, description, icon, badge, and hide/show link
// as well as a renderElement on the Right and Left

export function removeClassPrefix(word: string) {
	return word
		.replace(/Primary /g, "")
		.replace(/JSS /g, "")
		.replace(/SSS /g, "");
}

export const toTitleCase = (string: string) =>
	string
		.split(" ")
		.map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
		.join(" ")
		.split(",")
		.map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
		.join(", ")
		.split(".")
		.map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
		.join(". ");

/**
 * Sorts an array of objects in alphabetical order using the supplied `key`
 * @param {Array[{}]} array Array of objects to be ordered alphabetically
 * @param {String} key the object key to be used in the sorting
 * @returns A sorted Array
 * @example
 * orderAlphabetically([{food: "Yam", price: 500},{food: "Egg", price: 100}], "food")
 * //=> [{food: "Egg", price: 100}, {food: "Yam", price: 500}]
 */
export const orderAlphabetically = (array: Array<any>, key: string) => {
	return array.sort((a, b) => {
		if (a[key] < b[key]) return -1;
		if (a[key] > b[key]) return 1;
		return 0;
	});
};

/**
 * Checks if all the properties of an object have values
 * Applies to boolean, string, array or object values
 * @param {Object} obj - Object to be checked
 * @param {Object} deleteKey1 - A key to be disregarded
 * @param {Object} deleteKey2 - A key to be disregarded
 * @returns Boolean
 */

export function isValidObject(
	obj: { [key: string]: any },
	deleteKey1 = "",
	deleteKey2 = ""
): boolean {
	const objKeyValue = Object.entries(obj)
		.filter((keyValue) => keyValue[0] !== deleteKey1)
		.filter((keyValue) => keyValue[0] !== deleteKey2)
		.map((keyValue) => keyValue[1]);
	return objKeyValue.length > 0
		? objKeyValue.every((item) =>
				Array.isArray(item)
					? item.length > 0
					: typeof item === "object"
					? isValidObject(item)
					: Boolean(item) || typeof item === "boolean"
		  )
		: false;
}
/**
 * Groups an array of objects using a key into two arrays
 * one containing objects that have the key, and the other containing
 * objects that do not have the key.
 * @param {Array} array An array of objects containing properties to be grouped
 * @param {String} key  Name of the object key that will be used to group arrays
 * @example
 * groupArrayByKey([{food: "Yam", type: "Carbohydrate"},{food: "Beans", type: "Protein"},{food: "Rice", type: "Carbohydrate"},{food: "Vegetable", type: "vitamins"}],"Carbohydrate")
 * //=> {arrayWithKey: [{food: "Yam", type: "Carbohydrate"}, {food: "Rice", type: "Carbohydrate"}], arrayWithoutKey: [{food: "Beans", type: "Protein"}, {food: "Vegetable", type: "vitamins"}]}
 */
export function groupArrayByKey(array: Array<any>, key: string) {
	const firstKey = array[0][key];
	const arrayWithKey = array.filter((item) => item[key] === firstKey);
	const arrayWithoutKey = array.filter((item) => !arrayWithKey.includes(item));
	return { arrayWithKey, arrayWithoutKey };
}

/**
 * Chunks an array of objects into smaller arrays with similiar object keys
 * @param {Array} array
 * @param {String} key
 * @example
 * chunkArrayByKey([{food: "Yam", type: "Carbohydrate"},{food: "Beans", type: "Protein"},{food: "Rice", type: "Carbohydrate"},{food: "Vegetable", type: "vitamins"}],"Carbohydrate")
 * //=> [[{food: "Yam", type: "Carbohydrate"}, {food: "Rice", type: "Carbohydrate"}],[{food: "Beans", type: "Protein"}],[{food: "Vegetable", type: "vitamins"}]]
 */
export function chunkArrayByKey(array: Array<any>, key: string) {
	const result = [];
	let continueLoop = true;
	let startArr = array;

	const rr = groupBy(array, [key]);
	return Object.values(rr);
	console.log(rr);
	console.log(array);
	console.log(key);
	while (continueLoop) {
		const { arrayWithKey, arrayWithoutKey } = groupArrayByKey(startArr, key);
		if (arrayWithKey.length > 0) result.push(arrayWithKey);
		startArr = arrayWithoutKey;
		if (arrayWithoutKey.length === 0) continueLoop = false;
	}
	console.log(result);
	return result;
}

export function getRandomElemFromArray(array: Array<any>) {
	return array[Math.floor(Math.random() * array.length)];
}

export function newChunkArrayByKey(array: Array<any>, key: string) {
	const result = groupBy(array, [key]);
	return Object.entries(result);
}

/**
 * This combines an array of strings into a string output inserting
 * "," and "and" where appropriate
 * @param {Array} array
 *
 * @example
 * arrayToString(["a","b","c"])
 * //=>"a, b and c"
 */
export function arrayToString(array: Array<any>, separator = "and") {
	let string = "";

	array.forEach((x, i) => {
		if (i < array.length - 2) string = string.concat(x, ", ");
		if (i === array.length - 2) string = string.concat(x, ` ${separator} `);
		if (i > array.length - 2) string = string.concat(x);
	});

	return string;
}

/* Given a start date, end date and day name, return
 ** an array of dates between the two dates for the
 ** given day inclusive
 ** @param {Date} start - date to start from
 ** @param {Date} end - date to end on
 ** @param {string} dayName - name of day
 ** @returns {Array} array of Dates
 */
export function getDaysBetweenDates(
	start: string | number | Date,
	end: number | string | Date,
	dayName: string
) {
	const result = [];
	const days: { [key: string]: number } = {
		sunday: 0,
		monday: 1,
		tuesday: 2,
		wednesday: 3,
		thursday: 4,
		friday: 5,
		saturday: 6,
	};
	const day = days[dayName.toLowerCase()];
	// Copy start date
	const current = new Date(start);
	// Shift to next of required days
	current.setDate(current.getDate() + ((day - current.getDay() + 7) % 7));
	// While less than end date, add dates to result array
	while (current < end) {
		result.push(+current);
		current.setDate(current.getDate() + 7);
	}
	return result;
}

export const scrollToId = (id: string, scrollProps = {}) => {
	const section = document.getElementById(id);
	const scrollObj: ScrollIntoViewOptions = {
		block: "start",
		inline: "start",
		behavior: "smooth",
		...scrollProps,
	};
	if (section) {
		section.scrollIntoView(scrollObj);
	}
};
