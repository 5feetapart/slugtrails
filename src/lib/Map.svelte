<script lang='ts'>
    import {LeafletMap, DivIcon, Marker, TileLayer} from 'svelte-leafletjs';
	import type {LatLngExpression, MapOptions} from "leaflet"
	import { browser } from '$app/environment';
	export let locations: {
		coordinate: string,
		title: string,
		id: string
	}[] = [
		{
			coordinate: "36.962860,-122.000120",
			title: "Waterboarding for Fun and Profit",
			id: "2"
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
        leafletMap.getMap().fitBounds([[37.0404645771983, -122.14911178881417], [36.886437403855844, -121.92909839571384]]);
	});

	function latLngFromString(coord: string) {
		return coord.split(",").map(parseFloat) as LatLngExpression
	}

</script>

<div class="example map">
    <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
		{#each locations as location, index}
			<Marker latLng={latLngFromString(location.coordinate)}>
				<DivIcon>
					<div class="marker">
						{index+1}
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

	.marker {
		background-color: var(--clr-green-700);
		aspect-ratio: 1 / 1;
		width: 2rem;
		border-radius: 50%;
		color: black;
		font-weight: bold;
		font-size: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	:global(.leaflet-marker-icon) {
		background-color: transparent;
		border: none;
	}
</style>