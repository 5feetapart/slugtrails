/** @description broadcasts events 
 - pdown - with detail of PointerEvent + {e.relativeX, e.relativeY} 
 - pup - with detail of PointerEvent + {e.relativeX, e.relativeY}
 - pmove - with detail of PointerEvent + {e.relativeX, e.relativeY} 
 - ppinch - with detail of PointerEvent + {e.relativeX, e.relativeY}
 - ppinchdown - with detail of PointerEvent + {e.relativeX, e.relativeY}
 - ppan - with detail of PointerEvent + {e.relativeX, e.relativeY}
 - ptap - with detail of PointerEvent + {e.relativeX, e.relativeY}
 - pholdup - with detail of PointerEvent + {e.relativeX, e.relativeY}
 on the input elem */

type PEvent = PointerEvent & {
	relativeX: number
	relativeY: number
	downAt: number
	downX: number
	downY: number
}

export default function addMoreEvents(elem: HTMLElement) {
	let isDown = false,
		pointersDown: { [id: number]: PEvent } = {},
		pointersDownCt = 0,
		scaleAmount = 1,
		distAtDown: number | null = null

	function addRelativePos(event: PEvent) {
		let rect = elem.getBoundingClientRect()
		event.relativeX = event.clientX - rect.left
		event.relativeY = event.clientY - rect.top
		return event
	}

	function addDownAt(event: PEvent) {
		event.downAt = performance.now()
		event.downX = event.relativeX
		event.downY = event.relativeY
		return event
	}

	elem.addEventListener('pointerdown', (e: PointerEvent) => {
		isDown = true
		addRelativePos(e as PEvent)
		addDownAt(e as PEvent)
		pointersDown[e.pointerId] = {
			...(e as PEvent)
		}

		const pdownEvent = new CustomEvent('pdown', {
			detail: {
				...e
			}
		})

		if (pointersDownCt == 0) {
			const startPanEvent = new CustomEvent('ppanstart', {
				detail: {
					...e
				}
			})
			elem.dispatchEvent(startPanEvent)
		}

		if (pointersDownCt == 1) {
			const keys = Object.keys(pointersDown).map((key) => parseInt(key))

			keys.forEach((key) => {
				addDownAt(pointersDown[key])
			})
			distAtDown = Math.sqrt(
				Math.pow(pointersDown[keys[0]].relativeX - pointersDown[keys[1]].relativeX, 2) +
					Math.pow(pointersDown[keys[0]].relativeY - pointersDown[keys[1]].relativeY, 2)
			)
			const ppinchEvent = new CustomEvent('ppinchdown', {
				detail: {
					points: [pointersDown[keys[0]], pointersDown[keys[1]]],
					scaleAmount
				}
			})

			elem.dispatchEvent(ppinchEvent)
		}
		pointersDownCt++
	})
	let onUp = (e: PointerEvent) => {
		const keys = Object.keys(pointersDown).map((key) => parseInt(key))
		if (pointersDownCt == 2) {
			const ppinchEvent = new CustomEvent('ppinchup', {
				detail: {
					points: [pointersDown[keys[0]], pointersDown[keys[1]]],
					scaleAmount
				}
			})
			elem.dispatchEvent(ppinchEvent)
		} else if (pointersDownCt == 1) {
			const smallDist = Math.sqrt(
				Math.pow(pointersDown[keys[0]].relativeX - pointersDown[keys[0]].downX, 2) +
					Math.pow(pointersDown[keys[0]].relativeY - pointersDown[keys[0]].downY, 2)
			)
			if (smallDist < 10) {
				if (performance.now() - pointersDown[keys[0]].downAt < 500) {
					const ptapEvent = new CustomEvent('ptap', {
						detail: {
							...pointersDown[keys[0]]
						}
					})
					elem.dispatchEvent(ptapEvent)
				}
				// else broadcast pholdup
				else {
					const pholdupEvent = new CustomEvent('pholdup', {
						detail: {
							...pointersDown[keys[0]]
						}
					})
					elem.dispatchEvent(pholdupEvent)
				}
			} else {
				elem.dispatchEvent(
					new CustomEvent('ppanup', {
						detail: {
							...pointersDown[keys[0]]
						}
					})
				)
			}
		}
		const deleted = pointersDown[e.pointerId]
		delete pointersDown[e.pointerId]
		pointersDownCt--
		if (pointersDownCt <= 0) {
			isDown = false
			pointersDownCt = 0
		}
	}
	elem.addEventListener('pointerup', onUp)
	elem.addEventListener('pointercancel', onUp)

	elem.addEventListener('pointerleave', onUp)

	elem.addEventListener('pointerout', onUp)
	elem.addEventListener('pointermove', (e: PointerEvent) => {
		const pointerDict = pointersDown[e.pointerId]
		if (!pointerDict) {
			return
		}
		addRelativePos(e as PEvent)
		for (let key in e as PEvent) {
			pointerDict[key] = e[key]
		}
		if (isDown) {
			const pmoveEvent = new CustomEvent('pmove', {
				detail: {
					...pointerDict
				}
			})
			elem.dispatchEvent(pmoveEvent)

			if (pointersDownCt == 2) {
				const keys = Object.keys(pointersDown)
				const p1 = pointersDown[keys[0]],
					p2 = pointersDown[keys[1]]
				const dist = Math.sqrt(
					Math.pow(p1.relativeX - p2.relativeX, 2) + Math.pow(p1.relativeY - p2.relativeY, 2)
				)
				const ppinchEvent = new CustomEvent('ppinch', {
					detail: {
						points: [p1, p2],
						scaleAmount: dist / distAtDown
					}
				})
				elem.dispatchEvent(ppinchEvent)
				const zoomEvent = new CustomEvent('zoom', {
					detail: {
						scaleAmount: dist / distAtDown,
						relativeX: (p1.relativeX + p2.relativeX) / 2,
						relativeY: (p1.relativeY + p2.relativeY) / 2
					}
				})
				elem.dispatchEvent(zoomEvent)
				distAtDown = dist
			} else if (pointersDownCt == 1) {
				const panEvent = new CustomEvent('ppan', {
					detail: {
						...pointerDict,
						fromPointer: true
					}
				})
				elem.dispatchEvent(panEvent)
			}
		}
	})

	elem.addEventListener(
		'wheel',
		(e) => {
			e.preventDefault()
			if (e.ctrlKey) {
				addRelativePos(e)
				const zoomEvent = new CustomEvent('zoom', {
					detail: {
						scaleAmount: e.deltaY > 0 ? (1 - e.deltaY * 0.01) / 1 : 1 / (1 + 0.01 * e.deltaY),
						relativeX: e.relativeX,
						relativeY: e.relativeY
					}
				})
				elem.dispatchEvent(zoomEvent)
			} else {
				const startPanEvent = new CustomEvent('ppanstart', {
					detail: {
						relativeX: 0,
						relativeY: 0
					}
				})
				elem.dispatchEvent(startPanEvent)
				const panEvent = new CustomEvent('ppan', {
					detail: {
						relativeX: e.deltaX,
						relativeY: e.deltaY,
						downX: 0,
						downY: 0
					}
				})
				elem.dispatchEvent(panEvent)
			}
		},
		{ passive: false }
	)
}
