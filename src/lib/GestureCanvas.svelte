<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { PEvent, WheelEvernt } from './addMoreEvents'

	createEventDispatcher<{ onpup: PEvent }>()
</script>
