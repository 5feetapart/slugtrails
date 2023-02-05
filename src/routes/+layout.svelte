<script>
	import Nav from './Nav.svelte'
	import '../reset.css'
	import '../global.css'
	import SignIn from '$lib/SignIn.svelte'
	import { userData } from '$stores/userData'
	import Spinner from '$lib/Spinner.svelte'
</script>

<Nav />

<main>
	{#if $userData === null}
		<SignIn />
	{:else if $userData === undefined}
		<div class="spinner-parent">
			<Spinner />
		</div>
	{:else}
		<slot />
	{/if}
</main>

<style>
	.spinner-parent {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	:global(.spinner-parent > *) {
		width: 50px;
	}
</style>
