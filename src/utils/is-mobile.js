
/**
 * 
 * @param {移动端检测} agent 
 */
export default function isMobile(agent = navigator.userAgent) {
	return /Android|iPhone|iPad|iPod/i.test(agent)
}
