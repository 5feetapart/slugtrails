<script>
	import Nav from './Nav.svelte'
	import '../reset.css'
	import '../global.css'
	import SignIn from '$lib/SignIn.svelte'
	import { userData } from '$stores/userData'
</script>

<Nav />

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
	main {
		max-width: var(--page-width);
		margin: 0 auto;
	}
</style>
