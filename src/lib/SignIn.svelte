<script lang="ts">
	import GButton from '$lib/GButton.svelte';
	import { GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
	import { userData, auth } from '$stores/userData';

	function signIn(event: CustomEvent<google.accounts.id.CredentialResponse>) {
		loading = true;
		const gAuthResponse = event.detail;
		const credential = GoogleAuthProvider.credential(gAuthResponse.credential);
		signInWithCredential(auth, credential);
	}

	let loading = $userData === undefined; // init loading value before mount

	$: loading = $userData === undefined; // update loading value after mount
	$: greeting =
		$userData === undefined
			? ''
			: $userData === null
			? 'Sign In'
			: `Welcome, ${$userData.displayName}`;
</script>

<div class="card flex h-center" class:loading>
	<h2>{greeting}</h2>
	{#if $userData === null}
		<GButton on:signin={signIn} width={220} />
	{:else if $userData === undefined}
		<code>loading...</code>
	{:else}
		<button on:click={() => signOut(auth)}>Sign Out</button>
	{/if}
</div>

