
//获取浏览器前缀并返回拼装后css属性名，用于css兼容
//只能返回-webkit- 和 标准的属性
const getPrefixedCssProp = (() => {
	let properties = {}//缓存已经检测的属性名
	const style = document.documentElement.style

	function getPrefixedCssProperty(name, source = style) {
		if (name && typeof name === 'string') {
			if (properties[name]) {
				return properties[name]
			}
			if (typeof source[name] === 'string') {//使用typeof 检测 类型
				return (properties[name] = name)
			}
			if (typeof source[`-webkit-${name}`] === 'string') {
				return (properties[name] = `-webkit-${name}`)
			}
			throw new RangeError(`Unable to find "${name}" style property.`)
		}
		throw new TypeError('Expected a string.')
	}

	getPrefixedCssProperty.clearCache = () => (properties = {})//清除properties

	return getPrefixedCssProperty
})()

export default getPrefixedCssProp
