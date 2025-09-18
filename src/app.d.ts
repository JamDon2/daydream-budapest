// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		gtag: (
			command: 'event',
			action: string,
			params: {
				send_to: string;
				[key: string]: unknown; // Allows for other optional parameters
			}
		) => void;
	}
}

export {};
