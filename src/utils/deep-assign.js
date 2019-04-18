import isObject from './is-object'
import each from './each'

//深度合并对象
export default function deepAssign(target, ...sources) {
	if (isObject(target)) {
		each(sources, source => {
			each(source, (data, key) => {
				if (isObject(data)) { //data 是[object Object]
					if (!target[key] || !isObject(target[key])) {//判断原对象中是否存在key 并且不是[object Object]
						target[key] = {}
					}
					deepAssign(target[key], data)
				} else {
					target[key] = data
				}
			})
		})
		return target
	} else {
		throw new TypeError('Target must be an object literal.')
	}
}
