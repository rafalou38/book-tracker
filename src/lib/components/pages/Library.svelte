<script>
	import { Fab, Page } from 'konsta/svelte';
	import Book from '../Book.svelte';
	import EmptyBook from '../EmptyBook.svelte';
	import MdIcon from '../MdIcon.svelte';
</script>

<div class="page">
	<!-- <Fab class="fixed right-4-safe bottom-4-safe z-20">
		<MdIcon slot="icon">collections_bookmark</MdIcon>
	</Fab> -->
	<Book
		imageUrl="http://books.google.com/books/publisher/content?id=aMwAEAAAQBAJ&printsec=frontcover&img=1&zoom=1"
	/>
	<Book
		imageUrl="http://books.google.com/books/publisher/content?id=aMwAEAAAQBAJ&printsec=frontcover&img=1&zoom=1"
	/>
	<Book
		imageUrl="http://books.google.com/books/publisher/content?id=aMwAEAAAQBAJ&printsec=frontcover&img=1&zoom=1"
	/>
	<EmptyBook />
</div>

<style lang="postcss">
	.page {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		padding: 0.5em;
		grid-gap: 0.5em;
	}
</style>
