<script lang="ts">
	import addMoreEvents, {
		type PanEvent,
		type PEvent,
		type PPinchEvent,
		type ZoomEvent
	} from './addMoreEvents'
	import type { Events } from './addMoreEvents'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher<{
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
	}>()

	export let canvas: HTMLCanvasElement
</script>

<canvas bind:this={canvas} use:addMoreEvents={dispatch} />

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
