<script>
	import Search from '$lib/SearchBar.svelte'
</script>

<nav>
	<h1><a href="/"> Slug Trails</a></h1>
	<Search />
	<a href="/settings">
		<span class="material-symbols-outlined"> settings </span>
	</a>
</nav>

<style>
	h1 {
		color: var(--clr-gray-900);
		white-space: pre;
	}
	a {
		color: inherit;
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
