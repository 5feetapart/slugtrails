<script lang="ts">
	import { activities } from '$lib/Activity'
	import type { PageData } from './$types'
	import Activity from '$lib/Activity.svelte'
	export let data: PageData

	$: activity = $activities ? $activities[parseInt(data.id)] : undefined
</script>

{#if activity}
	<Activity {activity} />
{/if}
