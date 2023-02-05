<script lang="ts">
	import ActivityTracker from "$lib/ActivityTracker.svelte";

</script>
<div class="wrapper">
<div class="wrapper-inner">
    <ActivityTracker />
</div>
    
</div>

<!-- dispatch start, time.now -->
<style>
.wrapper{
    margin:var(--gap-4);
    padding:var(--gap-4);

}

    .wrapper-inner{
        text-align: center;
        justify-content:center;
        display: flex;
        flex-direction: column;
        border:var(--gap-1) solid var(--clr-green-500);
        padding:var(--gap-4);
        border-radius: var(--gap-4);
    }

    .wrapper-inner > *{
        padding:var(--gap-2);
    }
</style>