<script lang="ts">
	import { activities } from '$lib/Activity'
	import type { PageData } from './$types'
	import Activity from '$lib/Activity.svelte'
	export let data: PageData

	$: activity = $activities[parseInt(data.id)]
</script>

{#if activity}
	<Activity {activity} />
{/if}
