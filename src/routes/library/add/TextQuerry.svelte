<script lang="ts">
	import { searchBookByNameFromGoogle } from '$lib/api/books';
	import type { GoogleBookRessource } from '$lib/api/books/types';
	import { Block, BlockTitle, List, ListInput, ListItem } from '@rafaelmc-dev/konsta/svelte';

	let results: GoogleBookRessource[] = [];
	async function updateSearch(query: string) {
		if (query) results = await searchBookByNameFromGoogle(query);
		else results = [];

		console.log(results);
	}

	// updateSearch('les fleurs du mal');
</script>

<BlockTitle>Search by name</BlockTitle>
<Block strong outlineIos class="space-y-2">
	<div class="max-w-md list-none flex">
		<ListInput
			label="Query"
			type="text"
			outline
			floatingLabel
			class="input"
			onChange={(e) => updateSearch(e.target.value)}
		/>
	</div>
	{#if results.length > 0}
		<List class="h-96 overflow-y-scroll">
			{#each results as book}
				<ListItem
					chevronMaterial={false}
					link
					title="[{book.volumeInfo.language}] {book.volumeInfo.title}"
					after={book.volumeInfo.publishedDate}
					subtitle={book.volumeInfo.authors?.join(', ') || ''}
					text={book.volumeInfo.publisher}
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
</Block>

<style lang="postcss">
	:global(.input) {
		--k-color-md-dark-surface: var(--k-color-md-dark-surface-1);
	}
	:global(.border-md-light-on-surface) {
		--tw-border-opacity: 0.5 !important;
	}
</style>
