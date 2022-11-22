<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getBook } from '$lib/api/library';
	import MdIcon from '$lib/components/MdIcon.svelte';
	import type { Book } from '$lib/db';
	import { Link, Navbar, Preloader } from '@rafaelmc-dev/konsta/svelte';

	import Viewer from './Viewer.svelte';

	async function init() {
		if (!browser) return goto('/library');

		const id = $page.url.searchParams.get('id');
		if (!id || !parseInt(id)) return goto('/library');

		const result = await getBook(parseInt(id));

		if (result) return result;

		return goto('/library');
	}

	const bookLoad = init() as Promise<Book | null>;
</script>

<div class="relative grow">
	{#await bookLoad}
		<!-- book is pending -->
		<Preloader class="loader" />
	{:then book}
		{#if book}
			<Viewer {book} />
		{/if}
	{/await}
</div>

<style lang="postcss">
	:global(.loader) {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
