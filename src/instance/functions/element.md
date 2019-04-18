* element
    * id 流水号
    * node 当前element
    * seen ? 是否已经展示过一次 default:false
    * revealed 展示状态 default:false
    * visible 是否可见 default:false
    * styles 样式效果
    * config  配制
    * containerId 容器id
    * geometry:{
		bounds: {
			top: offsetTop,
			right: offsetLeft + width,
			bottom: offsetTop + height,
			left: offsetLeft
		},
		height,
		width
	}

    

```js
styles:{
inline:{computed:'',generated:''}
opacity:{},
position:'',
transform:{computed,generated},
transition:{fragments:[],generated:{delayed,instant}}	
}
```

```js
container:{
    id: container.id,
    node: container.node,
    direction:{x,y},
    scroll:{left,top}
}
```

```js
js:{
    pristine:false 是否加载完毕
}
```