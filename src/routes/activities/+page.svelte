<script>
	import ActivityPreview from '$lib/ActivityPreview.svelte'
	import { activities } from '$lib/Activity'
</script>

{#if $activities}
	{#each $activities as activity}
		<ActivityPreview {activity} />
	{/each}
{/if}
