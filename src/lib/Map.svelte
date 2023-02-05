<script lang='ts'>
    import {LeafletMap, TileLayer} from 'svelte-leafletjs';
	import type {MapOptions} from "leaflet"
	import { browser } from '$app/environment';
	export let locations: {
		coordinate: string,
		title: string,
		id: string
	}[] = [
		{
			coordinate: "",
			title: "",
			id: ""
		}
	]
	import {onMount} from "svelte";
    const mapOptions: MapOptions = {
        center: [1.250111, 103.830933],
        zoom: 11,
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
        leafletMap.getMap().fitBounds([[1.266835, 103.796403], [1.232988, 103.854861]]);
    });
</script>

<div class="example map">
    <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
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