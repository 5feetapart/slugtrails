import { browser } from '$app/environment'
import { readable } from 'svelte/store'

export type Activity = {
	id: number
	title: string
	conditions: string
	coordinate: string
	address: string
	tags: string[]
	people?: number[] | number
	intensity: number
	cost: number[]
	description: string
	links: string[]
	photo: string
	reward: string
	bring: string[]
	Monday?: number[]
	Tuesday?: number[]
	Wednesday?: number[]
	Thursday?: number[]
	Friday?: number[]
	Saturday?: number[]
	Sunday?: number[]
}

async function jsonToActivityArray(path: string): Promise<Activity[]> {
	let json = await fetch(path)
	let data = JSON.parse(await json.text())
	// convert json to array
	let out = []
	for (let i = 1; i < Object.keys(data).length; i++) {
		out.push(data[i])
	}
	return out
}

export const activities = readable<Activity[]>(undefined, (set) => {
	if (browser) {
		jsonToActivityArray('/slugTrails.json').then((activities) => {
			set(activities)
			console.log(activities)
		})
	}
})
