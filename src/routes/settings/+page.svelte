<script>
	import { signOut } from 'firebase/auth'
	import { auth } from '$stores/userData'
</script>

<h2>Settings</h2>

<button on:click={() => signOut(auth)}>log out</button>
