<script>
	import { signOut } from 'firebase/auth'
	import { auth } from '$stores/userData'
</script>

<div class="wrapper">
<div class = "wrapper-inner">
<h2>Settings</h2>
<button on:click={() => signOut(auth)}>Log out</button>
</div>
</div>

<style>

	.wrapper{
		background-color:var(--clr-gray-50);
		background-size: cover;
		padding:var(--gap-4);
	}

	.wrapper-inner{
		text-align:center;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin:var(--gap-4);
		background-color:var(--clr-pink-700);
		padding:var(--gap-4);
		border-radius: var(--gap-3);
		border:var(--gap-1) solid var(--clr-pink-500);
	}
	h2{
		color:var(--clr-gray-900);
		padding:var(--gap-4);
	}
	button {
		font-family: var(--ft-header);
		color: var(--clr-gray-900);
		background-color: var(--clr-gray-50);
		border: var(--gap-1) solid var(--clr-pink-500);
		padding: var(--gap-2);
		border-radius: var(--gap-3);
	}

</style>
