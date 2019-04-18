import clean from '../methods/clean'

export default function animate(element, force = {}) {
	const pristine = force.pristine || this.pristine//?
	const delayed =
		element.config.useDelay === 'always' ||
		(element.config.useDelay === 'onload' && pristine) ||
		(element.config.useDelay === 'once' && !element.seen)

	const shouldReveal = element.visible && !element.revealed //是否需要加载元素
	const shouldReset = !element.visible && element.revealed && element.config.reset //是否需要重置

	if (force.reveal || shouldReveal) { //展示element
		return triggerReveal.call(this, element, delayed)
	}

	if (force.reset || shouldReset) { //重置element
		return triggerReset.call(this, element)
	}
}

function triggerReveal(element, delayed) {
	const styles = [
		element.styles.inline.generated,
		element.styles.opacity.computed,
		element.styles.transform.generated.final
	]
	if (delayed) {//启用延迟效果
		styles.push(element.styles.transition.generated.delayed)
	} else {
		styles.push(element.styles.transition.generated.instant)
	}
	element.revealed = element.seen = true
	element.node.setAttribute('style', styles.filter(s => s !== '').join(' '))
	registerCallbacks.call(this, element, delayed)
}

function triggerReset(element) {
	const styles = [
		element.styles.inline.generated,
		element.styles.opacity.generated,
		element.styles.transform.generated.initial,
		element.styles.transition.generated.instant
	]
	element.revealed = false
	element.node.setAttribute('style', styles.filter(s => s !== '').join(' '))
	registerCallbacks.call(this, element)
}

function registerCallbacks(element, isDelayed) {
	const duration = isDelayed
		? element.config.duration + element.config.delay
		: element.config.duration// 得到css3的时间

	const beforeCallback = element.revealed
		? element.config.beforeReveal
		: element.config.beforeReset //通过element.revealed当前状态确认回调函数

	const afterCallback = element.revealed
		? element.config.afterReveal
		: element.config.afterReset//通过element.revealed当前状态确认回调函数

	let elapsed = 0
	if (element.callbackTimer) {
		elapsed = Date.now() - element.callbackTimer.start //当前时间 - 上次时间 得到时间差
		window.clearTimeout(element.callbackTimer.clock) //直接清除
	}

	beforeCallback(element.node)

	element.callbackTimer = {
		start: Date.now(),
		clock: window.setTimeout(() => {
			afterCallback(element.node)
			element.callbackTimer = null
			if (element.revealed && !element.config.reset && element.config.cleanup) {//动画完成执行clean reset为true是 动画不会完成
				clean.call(this, element.node)
			}
		}, duration - elapsed)//(duration - elapsed)保证registerCallbacks在正确的时间执行
	}
}
