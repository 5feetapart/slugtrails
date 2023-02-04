<script lang="ts">
	import Search from '$lib/SearchBar.svelte'
	let width = 400
</script>

<svelte:window bind:innerWidth={width} />

<nav>
	<h1><a href="/"> Slug Trails</a></h1>
	<div class="flex">
		{#if width > 450}
			<Search />
		{:else}
			<a class="btn" href="/search">
				<span class="material-symbols-outlined"> search </span>
			</a>
		{/if}
		<a class="btn" href="/settings">
			<span class="material-symbols-outlined"> settings </span>
		</a>
	</div>
</nav>

<style>
	.flex {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	h1 {
		color: var(--clr-gray-900);
		white-space: pre;
	}
	a {
		color: inherit;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--clr-gray-900);
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: var(--page-width);
		margin: 0 auto;
		padding: var(--gap-2);
		background-color: var(--clr-pink-700);
		border-bottom: var(--gap-1) solid var(--clr-pink-500);
	}
</style>
