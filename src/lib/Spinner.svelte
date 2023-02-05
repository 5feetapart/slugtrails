<svg viewBox="0 0 100 100">
	<circle cx="50" cy="50" r="40" stroke-width="10" />
	<path d="M 10 40 C 20 20, 20 20, 40 10" stroke-width="10" />
</svg>

<style>
	svg {
		fill: transparent;
		stroke: var(--clr-gray-500);
		animation: 1s infinite linear spin;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	path {
		stroke: var(--clr-gray-900);
	}
</style>
