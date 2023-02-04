<script>
	import Search from '$lib/SearchBar.svelte';
	import '../reset.css';
	import '../global.css';
</script>

<nav>
	<h1>Slug Trails</h1>
	<Search />
</nav>

<main>
	<slot />
</main>

<style>
	h1 {
		color: var(--clr-gray-900);
		white-space: pre;
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

	main {
		max-width: var(--page-width);
		margin: 0 auto;
	}
</style>
