<script>
	import Nav from './Nav.svelte';
	import '../reset.css'
	import '../global.css'
	import SignIn from '$lib/SignIn.svelte'
	import { userData } from '$stores/userData'
</script>

<Nav></Nav>

<main>
	{#if $userData === null}
		<SignIn />
	{:else if $userData === undefined}
		<code>loading...</code>
	{:else}
		<slot />
	{/if}
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
