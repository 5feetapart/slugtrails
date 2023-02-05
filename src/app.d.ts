// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { Events } from '/addMoreEvents'
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface HTMLProps<T> {
		onppanstart?: (e: CustomEvent<Events[ppanstart]>) => void
		onppinchdown?: (e: CustomEvent<Events[ppinchdown]>) => void
		onppinchup?: (e: CustomEvent<Events[ppinchup]>) => void
		onpholdup?: (e: CustomEvent<Events[pholdup]>) => void
		onppanup?: (e: CustomEvent<Events[ppanup]>) => void
		onppinch?: (e: CustomEvent<Events[ppinch]>) => void
		onzoom?: (e: CustomEvent<Events[zoom]>) => void
		onpmove?: (e: CustomEvent<Events[pmove]>) => void
		onppan?: (e: CustomEvent<Events[ppan]>) => void
		onptap?: (e: CustomEvent<Events[ptap]>) => void
	}
}

export {}
