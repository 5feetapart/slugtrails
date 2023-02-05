<script lang="ts">
	import { base } from '$app/paths'
	import { draw } from 'svelte/transition'
	export let items: string[] = []
	let slug: HTMLCanvasElement
	$: context = slug ? slug.getContext('2d') : null

	window.addEventListener('resize', draw_slug, false)
	const base_image = new Image()
	const slug_image = new Image()
	base_image.src = '/img/background.PNG'
	slug_image.src = '/img/slug.PNG'
	base_image.onload = () => {
		draw_slug()
		if (!context) return
	}
	slug_image.onload = () => {
		draw_slug()
		if (!context) return
	}

	function resize() {
		slug.removeAttribute('width')
		slug.removeAttribute('height')
		slug.width = slug.clientWidth
		slug.height = slug.clientHeight
		draw_slug()
	}
	function draw_slug() {
		if (!context) return
		context.drawImage(base_image, 0, 0, slug.width, 450)
		context.drawImage(slug_image, slug.width / 2 - 100, 80, 200, 300)
	}

	$: context && resize()
</script>

<svelte:window on:resize={resize} />

<div class="parent">
	<!-- Arrows -->
	<div class="arrow-right">
		<button><span class="material-symbols-outlined"> arrow_forward_ios </span></button>
		<button><span class="material-symbols-outlined"> arrow_forward_ios </span></button>
		<button><span class="material-symbols-outlined"> arrow_forward_ios </span></button>
	</div>
	<div class="arrow-left">
		<button><span class="material-symbols-outlined"> arrow_back_ios </span></button>
		<button><span class="material-symbols-outlined"> arrow_back_ios </span></button>
		<button><span class="material-symbols-outlined"> arrow_back_ios </span></button>
	</div>
	<!-- Slug -->
	<div class="slug-container">
		<canvas bind:this={slug} />
	</div>
</div>

<style>
	canvas {
		width: 100%;
		height: 450px;
	}
	.parent {
		background-color: white;
		position: relative;
	}
	.arrow-right {
		position: absolute;
		right: 5px;
		z-index: 10000;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-around;
	}
	.arrow-left {
		position: absolute;
		left: 5px;
		z-index: 10000;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-around;
	}

	button {
		height: 30px;
		background-color: RGB(0, 0, 0, 0);
		border: none;
	}

	.slug-container {
		margin: 0 auto;
		background-color: var(--clr-green-700);
	}
</style>
