
//配制
export default {
	delay: 0,//延迟
	distance: '0',//css translate3d 距离
	duration: 600,//持续时间
	easing: 'cubic-bezier(0.5, 0, 0, 1)',//缓冲函数
	interval: 0,//间隔 
	opacity: 0,//透明度
	origin: 'bottom',//偏移方向(top left bottom right)
	rotate: {//css3 rotate 旋转
		x: 0,
		y: 0,
		z: 0
	},
	scale: 1,//css3 缩放
	cleanup: false,//是否在动画完成时执行clean()
	container: document.documentElement,//容器默认为documentElement
	desktop: true,//是否启用桌面浏览器
	mobile: true,//是否启用移动端浏览器
	reset: false,//离开可视范围时重置样式,以实现展示时的效果
	useDelay: 'always',// 怎样使用延迟
	viewFactor: 0.0,// 检测是否可见 - 容器高宽缩放因子，最大为1
	viewOffset: {// 检测是否可见 - 子元素的偏移
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	},
	afterReset() {},//
	afterReveal() {},//
	beforeReset() {},//
	beforeReveal() {}//
}
