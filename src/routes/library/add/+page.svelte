<script>
	import { goto } from '$app/navigation';
	import MdIcon from '$lib/components/MdIcon.svelte';
	import { activeTab } from '$lib/stores/page';

	import { Block, BlockTitle, Link, Navbar, ListInput } from '@rafaelmc-dev/konsta/svelte';
	import ISBNQuerry from './ISBNQuerry.svelte';
	import TextQuerry from './TextQuerry.svelte';

	let query = '';

	activeTab.set('');
</script>

<Navbar title="Track new book">
	<Link navbar iconOnly slot="right" href="/library">
		<MdIcon>close</MdIcon>
	</Link>
</Navbar>

<div class="wrapper">
	<div class="page">
		<TextQuerry bind:query />
		<ISBNQuerry bind:isbn={query} />
	</div>
</div>

<style lang="postcss">
	.wrapper {
		position: relative;
		flex-grow: 1;
		overflow-y: scroll;
	}
	.page {
		position: relative;
		grid-gap: 1em;
	}

	:global(.input) {
		--k-color-md-dark-surface: var(--k-color-md-dark-surface-1);
	}
	:global(.border-md-light-on-surface) {
		--tw-border-opacity: 0.5 !important;
	}
</style>
