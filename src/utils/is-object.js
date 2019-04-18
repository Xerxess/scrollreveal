//判断是否是[object Object] 通过 非空 instanceof实例 
export default function isObject(x) {
	return (
		x !== null &&
		x instanceof Object &&
		(x.constructor === Object ||
			Object.prototype.toString.call(x) === '[object Object]')
	)
}
