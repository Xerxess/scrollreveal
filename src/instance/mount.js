
/**
 * 猜测为返回一些方法
 * 代码来看调用地方在catch中，这段代码暂无意义
 */
function failure() {
	document.documentElement.classList.remove('sr')

	return {
		clean() {},
		destroy() {},
		reveal() {},
		sync() {},
		get noop() {
			return true
		}
	}
}

/**
 * 设置body 高度100%; 
 */
function success() {
	document.documentElement.classList.add('sr')

	if (document.body) {
		document.body.style.height = '100%'
	} else {//小技巧防止js放在body前无效
		document.addEventListener('DOMContentLoaded', () => {
			document.body.style.height = '100%'
		})
	}
}

export default { success, failure }
