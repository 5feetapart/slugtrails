<script lang="ts">
	import type { Activity } from './Activity'

	export let activity: Activity
</script>

<a href={`/activities/${activity['id number'] - 1}`}>
	<h1>{activity.title}</h1>
	<p>{activity.tags}</p>
</a>
