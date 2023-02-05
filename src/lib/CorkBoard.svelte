<script lang="ts">
	import { onMount } from 'svelte'
	let canvas: HTMLCanvasElement
	let cWidth = 400
	let cHeight = 400
	$: ctx = canvas ? canvas.getContext('2d') : null
	type Spec = {
		x: number
		y: number
		width: number
		height: number
		color: string
	}

	function makeSpecs() {
		const specs: Spec[] = []
		const darker = '#785338'
		const lighter = '#e6bb9c'
		for (let i = 0; i < 5000; i++) {
			const xRand = Math.random()
			const yRand = Math.random()
			const width = Math.random() * 3 + 1
			const height = Math.random() * 3 + 1
			const color = Math.random() > 0.5 ? darker : lighter
			specs.push({ x: xRand, y: yRand, width, height, color })
		}
		return specs
	}
	const specs = makeSpecs()
	function drawSpecs(ctx: CanvasRenderingContext2D) {
		const darker = '#785338'
		const lighter = '#e6bb9c'
		for (let i = 0; i < 5000; i++) {
			const xRand = Math.random() * cWidth
			const yRand = Math.random() * cHeight
			const width = Math.random() * 3 + 1
			const height = Math.random() * 3 + 1
			const color = Math.random() > 0.5 ? darker : lighter
			ctx.fillStyle = color
			ctx.fillRect(xRand, yRand, width, height)
		}
		// draw specs on canvas
	}

	function render(ctx: CanvasRenderingContext2D | null) {
		if (!ctx) return
		ctx.fillStyle = '#e09e6e'
		ctx.fillRect(0, 0, cWidth, cHeight)
		drawSpecs(ctx)
		// draw specs on canvas
	}

	function resize() {
		if (!canvas) return
		// remove canvas width and height attributes
		canvas.removeAttribute('width')
		canvas.removeAttribute('height')
		canvas.width = cWidth = canvas.clientWidth
		canvas.height = cHeight = canvas.clientHeight
		render(ctx)
	}

	$: render(ctx)

	onMount(() => {
		resize()
	})
</script>

<svelte:window on:resize={() => resize()} />

<canvas bind:this={canvas} />

<style>
	canvas {
		position: fixed;
		top: 5rem;
		height: calc(100vh - 5rem);
		width: 100vw;
		max-width: var(--page-width);
	}
</style>
