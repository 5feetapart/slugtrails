<script>
	import SearchBar from '$lib/SearchBar.svelte'
</script>

<div>
	<SearchBar placeholder="Please type in a search query here" />
	<p>Your search results will appear here</p>
</div>

<style>
	div {
		display: flex;
		justify-content: start;
		align-items: top;
		flex-direction: column;
		height: 50vh;
	}
	p {
		color: var(--clr-gray-500);
	}
</style>
