<script>
	import { getLibrary } from '$lib/api/library';
	import Book from '$lib/components/Book.svelte';
	import EmptyBook from '$lib/components/EmptyBook.svelte';
	import MdIcon from '$lib/components/MdIcon.svelte';
	import { activeTab } from '$lib/stores/page';
	import { ThemeStore } from '$lib/stores/theme';

	import { Link, Navbar } from '@rafaelmc-dev/konsta/svelte';
	import { onMount } from 'svelte';

	onMount(() => activeTab.set('library'));
</script>

<Navbar title="Library">
	<Link navbar iconOnly slot="right" onClick={() => ($ThemeStore.isDark = !$ThemeStore.isDark)}>
		{#if $ThemeStore.isDark}
			<MdIcon>light_mode</MdIcon>
		{:else}
			<MdIcon>dark_mode</MdIcon>
		{/if}
	</Link>
</Navbar>

<div class="wrapper">
	<div class="page">
		<!-- <Fab class="fixed right-4-safe bottom-4-safe z-20">
            <MdIcon slot="icon">collections_bookmark</MdIcon>
        </Fab> -->
		<!-- <div class="book-wrapper">
			<Book
				imageUrl="http://books.google.com/books/publisher/content?id=aMwAEAAAQBAJ&printsec=frontcover&img=1&zoom=1"
			/>
		</div>
		<div class="book-wrapper">
			<Book
				imageUrl="http://books.google.com/books/publisher/content?id=aMwAEAAAQBAJ&printsec=frontcover&img=1&zoom=1"
			/>
		</div>
		<div class="book-wrapper">
			<Book
				imageUrl="http://books.google.com/books/publisher/content?id=aMwAEAAAQBAJ&printsec=frontcover&img=1&zoom=1"
			/>
		</div> -->
		{#await getLibrary()}
			loading
		{:then books}
			{@const e = console.log(books)}
			{#each books as book}
				<div class="book-wrapper">
					<!-- <Book imageUrl="https://covers.openlibrary.org/b/ISBN/{book.info.isbn}-L.jpg" /> -->
					<Book data={book} />
				</div>
			{/each}
		{/await}
		<div class="book-wrapper ">
			<EmptyBook />
		</div>
	</div>
</div>

<style lang="postcss">
	.wrapper {
		position: relative;
		flex-grow: 1;
		overflow-y: scroll;
	}
	.page {
		min-height: 100%;
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		padding: 1em;
		grid-gap: 1em;
	}

	@media (max-width: 650px) {
		.page {
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		}
	}

	.book-wrapper {
		position: relative;
		display: grid;
		place-items: center;
		/* background: rgba(128, 128, 128, 0.094); */
		/* aspect-ratio: 72/104; */
		height: 100%;
	}
	:global(.page > .book-wrapper > *) {
		/* position: absolute; */
		width: min(100%, 250px);
	}
</style>
