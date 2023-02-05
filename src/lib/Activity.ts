import { browser } from "$app/environment"
import { readable } from "svelte/store";

export type Activity = {
	id: number,
	title: string,
	conditions: string,
	coordinate: string,
	address: string,
	tags: string[],
	people?: number[]|number,
	intensity: number,
	cost: number[],
	description: string,
	links: string[],
	photo: string,
	reward: string,
	bring: string[],
	Monday?: number[],
	Tuesday?: number[],
	Wednesday?: number[],
	Thursday?: number[],
	Friday?: number[],
	Saturday?: number[],
	Sunday?: number[]
	
}

async function jsonToActivityArray(path: string): Promise<Activity[]> {
	let json = await fetch(path);
	let data = await json.json();
	let activities: Activity[] = [];
	for (let i = 0; i < data.length; i++) {
		activities.push(data[i]);
	}
	return activities;
}

export const activities = readable<Activity[]>(undefined, (set) => {
	if (browser) {
		jsonToActivityArray("slugTrails.json").then((activities) => {
			set(activities);
		}
	}
})
