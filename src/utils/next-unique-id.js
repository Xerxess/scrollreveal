

/**
 * 从0生成流水号
 */
const nextUniqueId = (() => {
	let uid = 0
	return () => uid++
})()

export default nextUniqueId
