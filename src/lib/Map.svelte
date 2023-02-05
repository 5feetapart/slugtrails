<script lang='ts'>
    import {LeafletMap, DivIcon, Marker, TileLayer} from 'svelte-leafletjs';
	import type {MapOptions} from "leaflet"
	import { browser } from '$app/environment';
	export let locations: {
		coordinate: string,
		title: string,
		id: string
	}[] = [
		{
			coordinate: "36.964710,-122.042340",
			title: "Cruise the Coast",
			id: "1"
		},
		{
			coordinate: "37.024620,-122.091590",
			title: "Taking the High Road",
			id: "3"
		}
	]
	import {onMount} from "svelte";
    const mapOptions: MapOptions = {
        center: [36.9741, 122.0308],
        zoom: 15,
    };
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };
    let leafletMap: LeafletMap;
    onMount(() => {
        leafletMap.getMap().fitBounds([[37.01142816469954, -121.96545931678963], [36.93957288390141, -122.06853517114845]]);
	});

</script>

<div class="example map">
    <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
		{#each locations as location}
			<Marker latLng={[location.coordinate.split(",").map(function(item)]}>
				<DivIcon>
					<div style='background-color: #0000ff; color: #fff; width: 40px; border-radius: 50%;'>
						{location.title}
					</div>
				</DivIcon>
			</Marker>
		{/each}
    </LeafletMap>
</div>


<style>
    .map {
		width: 350px;
		height: 300px;
		border: var(--clr-green-500) solid var(--gap-1);
		margin: var(--gap-2);
		overflow:hidden;
	}
</style>