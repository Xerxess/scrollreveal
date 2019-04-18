
//参考 Element.getBoundingClientRect() 
export default function getGeometry(target, isContainer) {
	/**
	 * We want to ignore padding and scrollbars for container elements.
	 * More information here: https://goo.gl/vOZpbz
	 */

	// isNaN(NaN);       // true
	// isNaN(undefined); // true
	// isNaN({});        // true
	
	// isNaN(true);      // false
	// isNaN(null);      // false
	// isNaN(37);        // false
	
	// // strings
	// isNaN('37');      // false: "37" is converted to the number 37 which is not NaN
	// isNaN('37.37');   // false: "37.37" is converted to the number 37.37 which is not NaN
	// isNaN("37,5");    // true
	// isNaN('123ABC');  // true:  parseInt("123ABC") is 123 but Number("123ABC") is NaN
	// isNaN('');        // false: the empty string is converted to 0 which is not NaN
	// isNaN(' ');       // false: a string with spaces is converted to 0 which is not NaN

	const height = isContainer ? target.node.clientHeight : target.node.offsetHeight
	const width = isContainer ? target.node.clientWidth : target.node.offsetWidth

	let offsetTop = 0
	let offsetLeft = 0
	let node = target.node

	do {
		if (!isNaN(node.offsetTop)) {
			offsetTop += node.offsetTop
		}
		if (!isNaN(node.offsetLeft)) {
			offsetLeft += node.offsetLeft
		}
		node = node.offsetParent
	} while (node)//通过循环得target.node 相对于body的offsetLeft | offsetTop
	return {
		bounds: {
			top: offsetTop,
			right: offsetLeft + width,
			bottom: offsetTop + height,
			left: offsetLeft
		},
		height,
		width
	}
}
