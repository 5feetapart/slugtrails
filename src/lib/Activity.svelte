<script lang="ts">
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import type { Activity } from './Activity'
	type ex = {
		id: number
		title: string
		coordinate: string
		description: string
		links: string[]
		photo: string
		reward: string

		conditions: string
		address: string
		tags: string[]
		people?: number[] | number
		intensity: number
		cost: number[]
		bring: string[]

		Monday?: number[]
		Tuesday?: number[]
		Wensday?: number[]
		Thursday?: number[]
		Friday?: number[]
		Saturday?: number[]
		Sunday?: number[]
	}
	export let activity: Activity

	let Map: ConstructorOfATypedSvelteComponent

	onMount(async () => {
		if (browser) {
			Map = (await import('$lib/Map.svelte')).default
		}
	})

	$: days = {
		Monday: activity.Monday,
		Tuesday: activity.Tuesday,
		Wednesday: activity.Wednesday,
		Thursday: activity.Thursday,
		Friday: activity.Friday,
		Saturday: activity.Saturday,
		Sunday: activity.Sunday
	}

	$: table = {
		Conditions: activity.conditions,
		Address: activity.address,
		Tags: activity.tags,
		'Number of People': activity.people,
		Intensity: activity.intensity,
		Cost: activity.cost,
		'What to Bring': activity.bring
	}
</script>

<div>
	<h2>{activity.title}</h2>
	<svelte:component
		this={Map}
		locations={[{ coordinate: activity.coordinate, title: activity.title, id: activity.id }]}
	/>
	<p>{activity.description}</p>

	<h3>Good to Know</h3>

	<table>
		{#each Object.entries(table) as [condition, value]}
			{#if value}
				<tr>
					<td>{condition}</td>
					<td>
						{#if Array.isArray(value)}
							{#each value as v, index}
								{v}
								{#if index < value.length - 1}
									<br />
								{/if}
							{/each}
						{:else}
							{value}
						{/if}
					</td>
				</tr>
			{/if}
		{/each}
	</table>

	<h3>Hours</h3>
	<table>
		<tr>
			<th>Day</th>
			<th>Time</th>
		</tr>
		{#each Object.entries(days) as [day, time]}
			{#if time}
				<tr>
					<td>{day}</td>
					<td>
						{time[0]} - {time[1]}
						{#if time[3] && time[4]}
							<br />
							{time[3]} - {time[4]}
						{/if}
					</td>
				</tr>
			{/if}
		{/each}
	</table>
</div>
