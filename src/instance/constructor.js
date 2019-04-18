import defaults from './defaults'
import mount from './mount'

import clean from './methods/clean'
import destroy from './methods/destroy'
import reveal from './methods/reveal'
import sync from './methods/sync'

import delegate from './functions/delegate'

import isMobile from '../utils/is-mobile'
import transformSupported from '../utils/transform-supported'
import transitionSupported from '../utils/transition-supported'

import deepAssign from '../utils/deep-assign'
import logger from '../utils/logger'
import $ from 'tealight'

import { version } from '../../package.json'

let boundDelegate
let boundDestroy
let boundReveal
let boundClean
let boundSync
let config
let debug
let instance

export default function ScrollReveal(options = {}) {
	const invokedWithoutNew =
		typeof this === 'undefined' ||
		Object.getPrototypeOf(this) !== ScrollReveal.prototype//判断当前this是已是ScrollReveal的对象

	if (invokedWithoutNew) {
		return new ScrollReveal(options)
	}

	if (!ScrollReveal.isSupported()) {
		logger.call(this, 'Instantiation failed.', 'This browser is not supported.')
		return mount.failure()
	}

	let buffer
	try {
		buffer = config
			? deepAssign({}, config, options)
			: deepAssign({}, defaults, options)//合并 自定义配置
	} catch (e) {
		logger.call(this, 'Invalid configuration.', e.message)
		return mount.failure()
	}

	try {
		const container = $(buffer.container)[0]
		if (!container) {
			throw new Error('Invalid container.')
		}
	} catch (e) {
		logger.call(this, e.message)
		return mount.failure()
	}

	config = buffer

	if ((!config.mobile && isMobile()) || (!config.desktop && !isMobile())) {//检测mobile desktop配置错误
		logger.call(
			this,
			'This device is disabled.',
			`desktop: ${config.desktop}`,
			`mobile: ${config.mobile}`
		)
		return mount.failure()
	}

	mount.success()//设置 body

	this.store = { //应该是缓存一些处理对象
		containers: {},//容器
		elements: {},//elements集合 
		history: [],//历史记录
		sequences: {}//队列
	}

	this.pristine = true

	boundDelegate = boundDelegate || delegate.bind(this)
	boundDestroy = boundDestroy || destroy.bind(this)
	boundReveal = boundReveal || reveal.bind(this)
	boundClean = boundClean || clean.bind(this)
	boundSync = boundSync || sync.bind(this)

	Object.defineProperty(this, 'delegate', { get: () => boundDelegate })
	Object.defineProperty(this, 'destroy', { get: () => boundDestroy })
	Object.defineProperty(this, 'reveal', { get: () => boundReveal })////入口一
	Object.defineProperty(this, 'clean', { get: () => boundClean })
	Object.defineProperty(this, 'sync', { get: () => boundSync })

	Object.defineProperty(this, 'defaults', { get: () => config })
	Object.defineProperty(this, 'version', { get: () => version })
	Object.defineProperty(this, 'noop', { get: () => false })

	return instance ? instance : (instance = this)
}

//是否支持
ScrollReveal.isSupported = () => transformSupported() && transitionSupported()

//添加debug属性
Object.defineProperty(ScrollReveal, 'debug', {
	get: () => debug || false,
	set: value => (debug = typeof value === 'boolean' ? value : debug)
})
