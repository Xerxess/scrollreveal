import tealight from 'tealight'

import defaults from '../defaults'

import clean from '../methods/clean'

import style from '../functions/style'
import { Sequence } from '../functions/sequence'
import initialize from '../functions/initialize'

import each from '../../utils/each'
import logger from '../../utils/logger'
import isMobile from '../../utils/is-mobile'
import deepAssign from '../../utils/deep-assign'
import nextUniqueId from '../../utils/next-unique-id'

/**
 * target:容器
 * options:配制
 * syncing：?
 */
export default function reveal(target, options = {}, syncing = false) {
	const containerBuffer = []
	let sequence
	let interval = options.interval || defaults.interval

	try {
		if (interval) {
			sequence = new Sequence(interval) //?
		}

		const nodes = tealight(target)
		if (!nodes.length) {
			throw new Error('Invalid reveal target.')
		}

		const elements = nodes.reduce((elementBuffer, elementNode) => {
			const element = {}
			const existingId = elementNode.getAttribute('data-sr-id')


			if (existingId) {
				deepAssign(element, this.store.elements[existingId])

				/**
				 * In order to prevent previously generated styles
				 * from throwing off the new styles, the style tag
				 * has to be reverted to its pre-reveal state.
				 */
				element.node.setAttribute('style', element.styles.inline.computed)//?
			} else {
				element.id = nextUniqueId()//流水号
				element.node = elementNode//当前element
				element.seen = false//?
				element.revealed = false//?
				element.visible = false//是否可见
			}

			const config = deepAssign({}, element.config || this.defaults, options)//再次合并配置

			if ((!config.mobile && isMobile()) || (!config.desktop && !isMobile())) {
				if (existingId) {
					clean.call(this, element)
				}
				return elementBuffer // skip elements that are disabled
			}

			const containerNode = tealight(config.container)[0]
			if (!containerNode) {
				throw new Error('Invalid container.')
			}
			if (!containerNode.contains(elementNode)) { //当前节点不是容器子节点
				return elementBuffer // skip elements found outside the container
			}

			let containerId
			{//这里使用作用域｛｝
				containerId = getContainerId(
					containerNode,
					containerBuffer,
					this.store.containers
				)
				if (containerId === null) {
					containerId = nextUniqueId()
					containerBuffer.push({ id: containerId, node: containerNode })
				}
			}

			element.config = config
			element.containerId = containerId //又产生一个流水?
			element.styles = style(element)//元素的style对象

			if (sequence) {
				element.sequence = {
					id: sequence.id,
					index: sequence.members.length
				}
				sequence.members.push(element.id)
			}

			elementBuffer.push(element)
			return elementBuffer
		}, [])

		/**
		 * Modifying the DOM via setAttribute needs to be handled
		 * separately from reading computed styles in the map above
		 * for the browser to batch DOM changes (limiting reflows)
		 */
		each(elements, element => {
			this.store.elements[element.id] = element
			element.node.setAttribute('data-sr-id', element.id)
		})
	} catch (e) {
		return logger.call(this, 'Reveal failed.', e.message)
	}

	/**
	 * Now that element set-up is complete...
	 * Let’s commit any container and sequence data we have to the store.
	 */
	each(containerBuffer, container => {
		this.store.containers[container.id] = {
			id: container.id,
			node: container.node
		}
	})
	if (sequence) {
		this.store.sequences[sequence.id] = sequence
	}

	/**
	 * If reveal wasn't invoked by sync, we want to
	 * make sure to add this call to the history.
	 */
	if (syncing !== true) { //是否立即开始执行效果
		this.store.history.push({ target, options })

		/**
		 * Push initialization to the event queue, giving
		 * multiple reveal calls time to be interpreted.
		 */
		if (this.initTimeout) {
			window.clearTimeout(this.initTimeout)
		}
		this.initTimeout = window.setTimeout(initialize.bind(this), 0) //入口二
	}
}

/**
 * 查询当前node 是否存在container.id
 * @param {} node 
 * @param  {...any} collections 
 */
function getContainerId(node, ...collections) {
	let id = null
	each(collections, collection => {
		each(collection, container => {
			if (id === null && container.node === node) {
				id = container.id
			}
		})
	})
	return id
}
