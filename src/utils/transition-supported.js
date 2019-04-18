/**
 * 是否支持transition
 */
export default function transitionSupported() {
	const style = document.documentElement.style
	return 'transition' in style || 'WebkitTransition' in style
}
