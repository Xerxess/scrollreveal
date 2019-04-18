/**
 * 获取scroll对象 滚动条信息
 * @param {获取} container 
 */
export default function getScrolled(container) {
	let top, left
	if (container.node === document.documentElement) {
		top = window.pageYOffset
		left = window.pageXOffset
	} else {
		top = container.node.scrollTop
		left = container.node.scrollLeft
	}
	return { top, left }
}
