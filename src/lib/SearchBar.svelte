<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import { fade } from 'svelte/transition'
	export let placeholder: string | undefined = undefined
	let placeholders = ['free', 'outside', 'forest', 'hike', 'surf', 'lesson']
	let defaultPlaceholder = placeholder
	if (!placeholder) {
		defaultPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)]
	}
	export let value = ''
	let event = 0
	$: blank = value.length === 0
	$: if (blank) {
		if (browser) {
			placeholder = defaultPlaceholder
			event = window.setInterval(() => {
				placeholder = placeholders[Math.floor(Math.random() * placeholders.length)]
			}, 5000)
		}
	}

	$: if (!blank) {
		if (browser) {
			window.clearInterval(event)
			placeholder = ''
		}
	}

	function search(event: SubmitEvent) {
		goto(`/search/${value}`, { replaceState: true })
	}
</script>

<form class="parent" on:submit|preventDefault={search}>
	<div class="input-wrapper">
		<input type="text" bind:value />
		{#key placeholder}
			<span class="placeholder" transition:fade={{ duration: 200 }}>{placeholder}...</span>
		{/key}
	</div>
	<button type="submit">
		<span class="material-symbols-outlined"> search </span>
	</button>
</form>

<style>
	input,
	button {
		padding: var(--gap-1);
		border: none;
	}

	input {
		position: relative;
		width: 100%;
		z-index: 2;
		background-color: transparent;
	}

	button {
		display: flex;
		align-items: center;
		background-color: var(--clr-pink-500);
		color: var(--clr-gray-50);
	}

	.parent {
		display: flex;
		margin: var(--gap-2);
		border: var(--gap-1) solid var(--clr-pink-500);
		border-radius: var(--gap-2);
		overflow: hidden;
	}

	.placeholder {
		position: absolute;
		z-index: 1;
		color: var(--clr-gray-300);
		left: var(--gap-1);
		top: var(--gap-1);
	}

	.input-wrapper {
		width: 100%;
		position: relative;
		background-color: var(--clr-gray-50);
	}
</style>
