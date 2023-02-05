<script lang="ts">
	import PhotoUpload from './PhotoUpload.svelte'

	export let inProgress: boolean = false
</script>

{#if inProgress}
	<PhotoUpload />
	Note:
	<input type="text" />

	<button>Complete</button>
{:else}
	<h2>Start your workout!</h2>
	<button>Start</button>
{/if}
