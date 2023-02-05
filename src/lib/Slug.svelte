<script lang="ts">
	import { base } from '$app/paths'
	import { draw } from 'svelte/transition'
	import { createEventDispatcher } from 'svelte';
	import { empty } from 'svelte/internal';

    const dispatch = createEventDispatcher<{
        headChange: string|null,
        bodyChange: string|null,
        underChange: string|null
    }>()
    
    export let items: string[] = ['basketball', 'football', 'battery', 'ticket', "skateboard", "paddle", "surfboard"]

    type StringDict = {
        [key: string]: string
    }

    let headdict: StringDict = {
    'basketball': "/img/head/basketball.png",
    'football': "/img/head/football.png",
    };

    let bodydict: StringDict = {
    'battery': "/img/body/battery.png",
    'paddle': "/img/body/paddle.png",
    'ticket': "/img/body/ticket.png",
    };

    let underdict: StringDict = {
    'skateboard': "/img/under/skateboard.png",
    'surfboard': "/img/under/surfboard.png",
    }
    type ItemList = (string|null)[]
    let headlist: ItemList = [null]
    let bodylist: ItemList = [null]
    let underlist: ItemList = [null]

    let headpos = 0;
    let bodypos = 0;
    let underpos = 0;

    for(let i = 0; i < items.length; i++){
        function addToList(dict: StringDict, item: string, list: ItemList) {
            if (items[i] in dict) {
                list.push(item)
            }
        }
        const item = items[i]
        addToList(headdict, item, headlist)
        addToList(bodydict, item, bodylist)
        addToList(underdict, item, underlist)
    }

	let slug: HTMLCanvasElement
	$: context = slug ? slug.getContext('2d') : null

	window.addEventListener('resize', draw_slug, false)
	const base_image = new Image()
	const slug_image = new Image()
    const head_image = new Image()
    const body_image = new Image()
    const under_image = new Image()

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
        context.drawImage(under_image, slug.width / 2 - 260, -20)
        context.drawImage(body_image, slug.width / 2 - 260, 0)
		context.drawImage(slug_image, slug.width / 2 - 100, 80, 200, 300)
        context.drawImage(head_image, slug.width / 2 - 260, 0)
	}

    function updatehead(num: number){
        headpos += num
        if (headpos == headlist.length){
            headpos = 0
        }
        if (headpos == -1){
            headpos = headlist.length - 1
        }
        dispatch("headChange", headlist[headpos])
        const item = headlist[headpos]
        head_image.src = item ? headdict[item] : "//:0"
        if (!item) draw_slug()
        head_image.onload = draw_slug
    }

    function updatebody(num: number){
        bodypos += num
        if (bodypos == bodylist.length){
            bodypos = 0
        }
        if (bodypos == -1){
            bodypos = bodylist.length - 1
        }
        dispatch("bodyChange", bodylist[bodypos])
        const item = bodylist[bodypos]
        body_image.src = item ? bodydict[item] : "//:0"
        if (!item) draw_slug()
        body_image.onload = draw_slug
    }

    function updateunder(num: number){
        underpos += num
        if (underpos == underlist.length){
            underpos = 0
        }
        if (underpos == -1){
            underpos = underlist.length - 1
        }
        dispatch("underChange", underlist[underpos])
        const item = underlist[underpos]
        under_image.src = item ? underdict[item] : "//:0" 
        if (!item) draw_slug()
        under_image.onload = draw_slug
    }

    $: context && resize()
</script>

<svelte:window on:resize={resize} />

<div class="parent">
	<!-- Arrows -->
	<div class="arrow-right">
		<button on:click={()=>updatehead(1)}><span class="material-symbols-outlined"> arrow_forward_ios </span></button>
		<button on:click={()=>updatebody(1)}><span class="material-symbols-outlined"> arrow_forward_ios </span></button>
		<button on:click={()=>updateunder(1)}><span class="material-symbols-outlined"> arrow_forward_ios </span></button>
	</div>
	<div class="arrow-left">
		<button on:click={()=>updatehead(-1)}><span class="material-symbols-outlined"> arrow_back_ios </span></button>
		<button on:click={()=>updatebody(-1)}><span class="material-symbols-outlined"> arrow_back_ios </span></button>
		<button on:click={()=>updateunder(-1)}><span class="material-symbols-outlined"> arrow_back_ios </span></button>
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
		background-color: let(--clr-green-700);
	}
</style>
