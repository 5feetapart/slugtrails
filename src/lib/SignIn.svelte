<script lang="ts">
	import GButton from '$lib/GButton.svelte'
	import { GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth'
	import { userData, auth } from '$stores/userData'
	import Spinner from './Spinner.svelte';

	function signIn(event: CustomEvent<google.accounts.id.CredentialResponse>) {
		loading = true
		const gAuthResponse = event.detail
		const credential = GoogleAuthProvider.credential(gAuthResponse.credential)
		signInWithCredential(auth, credential)
	}

	let loading = $userData === undefined // init loading value before mount

	$: loading = $userData === undefined // update loading value after mount
	$: greeting =
		$userData === undefined
			? ''
			: $userData === null
			? 'Sign in to continue!'
			: `Welcome, ${$userData.displayName}`
</script>

<div class ="wrapper">
	<div class="wrapper-inner">
	<div class:loading>
		<h2>{greeting}</h2>
		{#if $userData === null}
			<GButton on:signin={signIn} width={240} />			
		{:else if $userData === undefined}
		<div class="spinner-parent">
			<Spinner />
		  </div>
		{:else}
			<button on:click={() => signOut(auth)}>Sign Out</button>
		{/if}
	</div>
	</div>
</div>

<style>

	.wrapper{
		background-color:var(--clr-gray-50);
		background-size: cover;
		padding:var(--gap-4);
	}

	.spinner-parent {
		width: 50px;
		aspect-ratio: 1 / 1;
	}

	.wrapper-inner{
		text-align:center;
		display: flex;
		justify-content: center;
		margin:var(--gap-4);
		background-color:var(--clr-pink-700);
		padding:var(--gap-4);
		border-radius: var(--gap-3);
		border:var(--gap-1) solid var(--clr-pink-500);
	}
	h2{
		color:var(--clr-gray-900);
		padding:var(--gap-4);
	}

</style>