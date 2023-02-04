<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	let btn: HTMLDivElement;
	import { clientId } from './clientId.json';
	export let width: number = 240;
	import assertScript from './loadScript';
	// get gapi script
	// if gapi script is not loaded, load it
	const dispatch = createEventDispatcher<{
		signin: google.accounts.id.CredentialResponse;
	}>();
	onMount(async () => {
		if (!window.google || !window.google.accounts) {
			await assertScript('https://accounts.google.com/gsi/client');
		}
		const gid = google.accounts.id;
		gid.initialize({
			client_id: clientId,
			callback: (event) => {
				dispatch('signin', event);
			}
		});
		gid.renderButton(btn, {
			type: 'standard',
			theme: 'outline',
			size: 'large',
			shape: 'rectangular',
			text: 'signin',
			width: width.toString()
		});
		gid.prompt();
	});
</script>

<div bind:this={btn} />
