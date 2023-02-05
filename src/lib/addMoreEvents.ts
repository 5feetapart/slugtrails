import { createEventDispatcher } from 'svelte'

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

type Events = {
	ppanstart: PEvent
	ppinchdown: PPinchEvent
	ppinchup: PPinchEvent
	pholdup: PEvent
	ppanup: PEvent
	ppinch: PPinchEvent
	zoom: ZoomEvent
	pmove: PEvent
	ppan: PanEvent
	ptap: PEvent
}

export type HasScaleAmount = {
	scaleAmount: number
}

export type HasRelativePos = {
	relativeX: number
	relativeY: number
}

export type HasClientPos = {
	clientX: number
	clientY: number
}

export type PEvent = PointerEvent &
	HasRelativePos & {
		downAt: number
		downX: number
		downY: number
	}

export type PanEvent = PEvent & {
	fromPointer: boolean
}

export type WEvent = WheelEvent & HasRelativePos

export type ZoomEvent = HasScaleAmount & HasRelativePos

type PPinchEvent = HasScaleAmount & {
	points: [PEvent, PEvent]
}

const dispatch = createEventDispatcher<Events>()

export default function addMoreEvents(elem: HTMLElement) {
	let isDown = false,
		pointersDown: { [id: number]: PEvent } = {},
		pointersDownCt = 0,
		scaleAmount = 1,
		distAtDown: number | null = null

	function addRelativePos(event: HasRelativePos & HasClientPos) {
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

		if (pointersDownCt == 0) {
			dispatch('ppanstart', e as PEvent)
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

			dispatch('ppinchdown', {
				points: [pointersDown[keys[0]], pointersDown[keys[1]]],
				scaleAmount
			})
		}
		pointersDownCt++
	})
	let onUp = (e: PointerEvent) => {
		const keys = Object.keys(pointersDown).map((key) => parseInt(key))
		if (pointersDownCt == 2) {
			dispatch('ppinchup', {
				points: [pointersDown[keys[0]], pointersDown[keys[1]]],
				scaleAmount
			})
		} else if (pointersDownCt == 1) {
			const smallDist = Math.sqrt(
				Math.pow(pointersDown[keys[0]].relativeX - pointersDown[keys[0]].downX, 2) +
					Math.pow(pointersDown[keys[0]].relativeY - pointersDown[keys[0]].downY, 2)
			)
			if (smallDist < 10) {
				if (performance.now() - pointersDown[keys[0]].downAt < 500) {
					dispatch('ptap', pointersDown[keys[0]])
				}
				// else broadcast pholdup
				else {
					dispatch('pholdup', pointersDown[keys[0]])
				}
			} else {
				dispatch('ppanup', pointersDown[keys[0]])
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
		let pointerDict = pointersDown[e.pointerId]
		if (!pointerDict || !distAtDown) {
			return
		}
		addRelativePos(e as PEvent)
		pointersDown[e.pointerId] = {
			...(e as PEvent)
		}
		pointerDict = pointersDown[e.pointerId]
		if (isDown) {
			dispatch('pmove', pointerDict)

			if (pointersDownCt == 2) {
				const keys = Object.keys(pointersDown).map((key) => parseInt(key))
				const p1 = pointersDown[keys[0]],
					p2 = pointersDown[keys[1]]
				const dist = Math.sqrt(
					Math.pow(p1.relativeX - p2.relativeX, 2) + Math.pow(p1.relativeY - p2.relativeY, 2)
				)
				dispatch('ppinch', {
					points: [p1, p2],
					scaleAmount: dist / distAtDown
				})
				dispatch('zoom', {
					scaleAmount: dist / distAtDown,
					relativeX: (p1.relativeX + p2.relativeX) / 2,
					relativeY: (p1.relativeY + p2.relativeY) / 2
				})
				distAtDown = dist
			} else if (pointersDownCt == 1) {
				const panEvent = new CustomEvent('ppan', {
					detail: {
						...pointerDict,
						fromPointer: true
					}
				})
				dispatch('ppan', pointerDict)
				elem.dispatchEvent(panEvent)
			}
		}
	})

	elem.addEventListener(
		'wheel',
		(e: WheelEvent) => {
			e.preventDefault()
			if (e.ctrlKey) {
				let event = e as WEvent

				addRelativePos(event)
				const zoomEvent = new CustomEvent('zoom', {
					detail: {
						scaleAmount: e.deltaY > 0 ? (1 - e.deltaY * 0.01) / 1 : 1 / (1 + 0.01 * e.deltaY),
						relativeX: event.relativeX,
						relativeY: event.relativeY
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
