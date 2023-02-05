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

async function jsonToActivityArray(path: string): Activity[] {
	let json = await fetch(path);

}

export const activities = readable<Activity[]>(undefined, (set) => {
	if (browser) set(jsonToActivityArray("slugTrails.json"));
})
// interface locationObject {
// 	[x: string]:
// }

// interface Location extends Array<locationObject> { }
