<script>
	import Stats from './Stats.svelte';
	import Favorites from './Favorites.svelte';
	import Slug from '$lib/Slug.svelte';
</script>

<style>
button{
    font-family: var(--ft-header);
    color:var(--clr-gray-900);
    background-color:var(--clr-pink-700);
    border:var(--gap-1)  solid var(--clr-pink-500);
    padding:var(--gap-2);
    border-radius: var(--gap-2);
}
</style>

<Slug />
<button>Journal</button>

<Favorites />

<Stats />
