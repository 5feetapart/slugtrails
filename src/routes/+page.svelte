<script>
	import Stats from './Stats.svelte'
	import Favorites from './Favorites.svelte'
	import Slug from '$lib/Slug.svelte'
	import { goto } from '$app/navigation'
	import { userData } from '$stores/userData'
	import { browser } from '$app/environment'

	$: if ($userData === null && browser) {
		console.log('redirecting to login')
		goto('/login', { replaceState: true })
	}
</script>

<Slug />

<div class="wrapper">
	<button>Journal</button>

	<Favorites />

	<Stats />
</div>

<style>
	button {
		font-family: var(--ft-header);
		color: var(--clr-gray-900);
		background-color: var(--clr-pink-700);
		border: var(--gap-1) solid var(--clr-pink-500);
		padding: var(--gap-2);
		border-radius: var(--gap-3);
	}

	.wrapper {
		background-color: var(--clr-green-700);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: var(--gap-3);
	}
</style>
