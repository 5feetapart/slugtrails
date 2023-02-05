<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, SvelteComponent } from 'svelte';

	let LeafletContainer: ConstructorOfATypedSvelteComponent

	onMount(async () => {
		if (browser) {
			LeafletContainer = (await import('$lib/Map.svelte')).default;
		}
	});
</script>

{#if browser}
<svelte:component this={LeafletContainer} />
{/if}