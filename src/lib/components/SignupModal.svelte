<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	export let show = false;
	export let iframeUrl = '';
	export let eventName = '';
	export let lang: 'en' | 'hu' = 'en';

	$: {
		if (typeof document !== 'undefined') {
			if (show) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'auto';
			}
		}
	}

	const dispatch = createEventDispatcher();
	let portalTarget: HTMLElement;
	let modalContent: HTMLElement;

	const translations: Record<'en' | 'hu', Record<string, string>> = {
		en: {
			closePopup: 'Close'
		},
		hu: {
			closePopup: 'Bezárás'
		}
	};

	function t(key: string, currentLang: 'en' | 'hu' = lang): string {
		return translations[currentLang]?.[key] ?? translations.en[key] ?? key;
	}

	function closeModal() {
		dispatch('close');
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	onMount(() => {
		// Create portal target that gets appended to body
		portalTarget = document.createElement('div');
		portalTarget.id = 'modal-portal';
		document.body.appendChild(portalTarget);
	});

	onDestroy(() => {
		// Cleanup portal
		if (portalTarget && document.body.contains(portalTarget)) {
			document.body.removeChild(portalTarget);
		}
	});

	// Reactive statement to move modal content to portal when show changes
	$: if (show && portalTarget && modalContent) {
		portalTarget.appendChild(modalContent);
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- This div will be moved to the portal (document.body) when show=true -->
<div
	bind:this={modalContent}
	class="fixed top-0 left-0 z-50 w-screen h-screen bg-black/50 flex items-center justify-center p-4 {show
		? 'block'
		: 'hidden'}"
	on:click={handleBackdropClick}
	on:keydown={handleKeydown}
	role="dialog"
	aria-modal="true"
	tabindex="-1"
>
	<div
		class="bg-white rounded-lg overflow-hidden shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col relative"
	>
		<!-- Header -->
		<div class="flex items-center justify-between p-4 border-b">
			<h2 class="text-xl font-bold text-gray-800 m-0">Sign Up for {eventName}</h2>
			<button
				on:click={closeModal}
				class="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer"
				aria-label={t('closePopup', lang)}
			>
				×
			</button>
		</div>

		<!-- Iframe Container -->
		<div class="flex-1 p-0">
			<iframe src={iframeUrl} title="Signup Form" class="w-full h-full border-0" allowfullscreen
			></iframe>
		</div>
	</div>
</div>
