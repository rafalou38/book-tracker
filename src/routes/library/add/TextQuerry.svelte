<script lang="ts">
	import { goto } from '$app/navigation';
	import { searchBookByNameFromGoogle } from '$lib/api/books';
	import type { GoogleBookRessource } from '$lib/api/books/types';
	import { addGoogleBookToLibrary } from '$lib/api/library';
	import { Block, BlockTitle, List, ListInput, ListItem } from '@rafaelmc-dev/konsta/svelte';

	let results: GoogleBookRessource[] = [];
	export let query = '';
	async function updateSearch(query: string) {
		if (query) results = await searchBookByNameFromGoogle(query);
		else results = [];

		console.log(results);
	}

	$: updateSearch(query);
</script>

<BlockTitle>Search by name</BlockTitle>
<Block class="space-y-20">
	<div class="list-none">
		<ListInput
			label="Query"
			type="text"
			outline
			placeholder="search by ISB, name, author, edition..."
			value={query}
			class="input"
			onChange={(e) => (query = e.target.value)}
		/>
	</div>
</Block>
{#if results?.length > 0}
	<List strong class="overflow-y-scroll h-[60vh]">
		{#each results as book}
			<ListItem
				chevronMaterial={false}
				link
				title="[{book.volumeInfo.language}] {book.volumeInfo.title}"
				after={book.volumeInfo.publishedDate}
				subtitle={book.volumeInfo.authors?.join(', ') || ''}
				text={book.volumeInfo.publisher}
				onClick={async () => {
					results = [];
					query = '';
					await addGoogleBookToLibrary(book);
					goto('/library');
				}}
			>
				<img
					slot="media"
					src={book.volumeInfo.imageLinks?.smallThumbnail ||
						'https://books.google.fr/googlebooks/images/no_cover_thumb.gif'}
					class="h-16 rounded-lg"
					alt="no thumbnail"
				/>
			</ListItem>
		{/each}
	</List>
{/if}

<style lang="postcss">
	:global(.input) {
		--k-color-md-dark-surface: var(--k-color-md-dark-surface-1);
	}
	:global(.border-md-light-on-surface) {
		--tw-border-opacity: 0.5 !important;
	}
</style>
