import { browser } from "$app/environment"
import { readable } from "svelte/store";

export type Activity = {
	id: Number,
	title: string,
	conditions: string,
	coordinate: string,
	address: string,
	tags: string[],
	people: any,
	intensity: Number
	cost: Number[],
	description: string,
	links: string[],
	photo: string,
	reward: string,
	bring: string[],
	Monday: any,
	Tuesday: any,
	Wensday: any,
	Friday: any,
	Saturday: any,
	Sunday: any
	
}

async function jsonToActivityArray(path: string): Activity[] {
	let json = await fetch(path);
	buildout json to activity array
}

export const activities = readable<Activity[]>(undefined, (set) => {
	if (browser) set(jsonToActivityArray("slugTrails.json"));
})
// interface locationObject {
// 	[x: string]:
// }

// interface Location extends Array<locationObject> { }
