
/**
 * 猜测为判断指定的element 是否相应 容器可见
 * @param {*} element 
 */
export default function isElementVisible(element = {}) {
	const container = this.store.containers[element.containerId]
	if (!container) return

	const viewFactor = Math.max(0, Math.min(1, element.config.viewFactor))
	const viewOffset = element.config.viewOffset

	const elementBounds = {// 子元素Bounds
		top: element.geometry.bounds.top + element.geometry.height * viewFactor,
		right: element.geometry.bounds.right - element.geometry.width * viewFactor,
		bottom: element.geometry.bounds.bottom - element.geometry.height * viewFactor,
		left: element.geometry.bounds.left + element.geometry.width * viewFactor
	}

	const containerBounds = { //容器Bounds
		top: container.geometry.bounds.top + container.scroll.top + viewOffset.top,
		right: container.geometry.bounds.right + container.scroll.left - viewOffset.right,
		bottom:container.geometry.bounds.bottom + container.scroll.top - viewOffset.bottom,
		left: container.geometry.bounds.left + container.scroll.left + viewOffset.left
	}

	return (
		(elementBounds.top < containerBounds.bottom &&
			elementBounds.right > containerBounds.left &&
			elementBounds.bottom > containerBounds.top &&
			elementBounds.left < containerBounds.right) ||
		element.styles.position === 'fixed'
	)
}
