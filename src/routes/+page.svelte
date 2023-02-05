<script>
	import Stats from './Stats.svelte'
	import Favorites from './Favorites.svelte'
	import Slug from '$lib/Slug.svelte'
	import { goto } from '$app/navigation'
	import { userData } from '$stores/userData'
	import { browser } from '$app/environment'
	import SignIn from '$lib/SignIn.svelte'
</script>

<div class="contain">
	<Slug />

	<div class="wrapper">
		<a href="/activities"> View Activities</a>
	</div>
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

	.contain {
		max-width: var(--page-width);
		margin: 0 auto;
	}
</style>
