<script lang="ts">
	import { goto } from '$app/navigation';
	import MdIcon from '$lib/components/MdIcon.svelte';
	import { db, type Book } from '$lib/db';
	import { Day } from '$lib/utils/time';

	import {
		ActionsLabel,
		Block,
		BlockTitle,
		Button,
		Dialog,
		DialogButton,
		Link,
		ListInput,
		Navbar,
		touchRipple
	} from '@rafaelmc-dev/konsta/svelte';

	export let book: Book;

	let confirmClear = false;
	let confirmDelete = false;

	$: db.books.put(book);
</script>

<Navbar title="Edit">
	<Link navbar iconOnly slot="right" href="/library/view?id={book.id}">
		<MdIcon>close</MdIcon>
	</Link>
</Navbar>

<BlockTitle>Infos</BlockTitle>
<Block class="cover-block" outline strong>
	<div class="list-none w-full">
		<ListInput
			label="Title"
			type="text"
			outline
			value={book.info.title}
			class="input w-full"
			onChange={(e) => (book.info.title = e.target.value)}
		/>
	</div>
</Block>
<BlockTitle>Cover</BlockTitle>
<Block class="cover-block" outline strong>
	<button
		class="book touch-ripple-primary"
		class:active={!book.info.isbnCover}
		style="--bg-url: url({book.info.thumbnail})"
		use:touchRipple={true}
		on:click={() => (book.info.isbnCover = false)}
	/>
	<button
		class="book touch-ripple-primary"
		class:active={book.info.isbnCover}
		style="--bg-url: url(https://covers.openlibrary.org/b/ISBN/{book.info.isbn}-L.jpg)"
		use:touchRipple={true}
		on:click={() => (book.info.isbnCover = true)}
	/>
</Block>

<BlockTitle>Infos</BlockTitle>
<Block class="cover-block" outline strong>
	<div class="list-none w-full">
		<ListInput
			label="Pages count"
			type="number"
			outline
			value={book.stats.pagesCount}
			class="input w-full"
			onChange={(e) => (book.stats.pagesCount = parseInt(e.target.value))}
		/>
		<div class="flex gap-4">
			<ListInput
				label="Book start"
				type="number"
				outline
				value={book.stats.pagesStart}
				class="input w-full"
				onChange={(e) => (book.stats.pagesStart = parseInt(e.target.value))}
			/>
			<ListInput
				label="Book end"
				type="number"
				outline
				value={book.stats.pagesEnd}
				class="input w-full"
				onChange={(e) => (book.stats.pagesEnd = parseInt(e.target.value))}
			/>
		</div>
	</div>
</Block>

<BlockTitle>Reading</BlockTitle>
<Block class="cover-block" outline strong>
	<div class="list-none w-full">
		<p>End date:</p>
		<input
			type="date"
			class=""
			min={new Day().toDateInput()}
			value={new Day(book.progress.eta).toDateInput()}
			on:change={(v) => (book.progress.eta = new Day(v.currentTarget.valueAsDate?.getTime()).n())}
		/>
	</div>
</Block>
<Block>
	<Button
		class="btn-reset"
		outline
		onClick={() => (confirmClear = true)}
		disabled={book.progress.current == 0}>Reset reading history</Button
	>
	<br />
	<Button class="btn-reset" outline onClick={() => (confirmDelete = true)}>Delete</Button>
</Block>

<Dialog
	opened={confirmClear || confirmDelete}
	onBackdropClick={() => {
		confirmClear = false;
		confirmDelete = false;
	}}
	class="duration-200"
>
	<svelte:fragment slot="title">Are you sure</svelte:fragment>
	This action can't be reverted
	<svelte:fragment slot="buttons">
		<DialogButton
			onClick={() => {
				confirmClear = false;
				confirmDelete = false;
			}}>No</DialogButton
		>
		<DialogButton
			strong
			onClick={async () => {
				if (confirmClear) {
					confirmClear = false;
					book.progress.daily.clear();
					book.progress.current = 0;
					book = book;
				} else if (confirmDelete) {
					await db.books.delete(book.id);
					goto('/library');
				}
			}}>Yes</DialogButton
		>
	</svelte:fragment>
</Dialog>

<style lang="postcss">
	:global(.input) {
		--k-color-md-dark-surface: var(--k-color-md-dark-surface-1);
	}
	:global(.border-md-light-on-surface) {
		--tw-border-opacity: 0.5 !important;
	}
	.book {
		@apply z-10 relative rounded-lg;
		/* height: 200px;
		width: 150px; */
		aspect-ratio: 72/104;
		flex-grow: 1;

		/* prettier-ignore */
		background: var(--bg-url),  linear-gradient(
			135deg, var(--surface-2) 0%, var(--surface-2) 5%, var(--surface-1) 5%, var(--surface-1) 10%, var(--surface-2) 10%, var(--surface-2) 15%, var(--surface-1) 15%, var(--surface-1) 20%, var(--surface-2) 20%, var(--surface-2) 25%, var(--surface-1) 25%, var(--surface-1) 30%, var(--surface-2) 30%, var(--surface-2) 35%, var(--surface-1) 35%, var(--surface-1) 40%, var(--surface-2) 40%, var(--surface-2) 45%, var(--surface-1) 45%, var(--surface-1) 50%, var(--surface-2) 50%, var(--surface-2) 55%, var(--surface-1) 55%, var(--surface-1) 60%, var(--surface-2) 60%, var(--surface-2) 65%, var(--surface-1) 65%, var(--surface-1) 70%, var(--surface-2) 70%, var(--surface-2) 75%, var(--surface-1) 75%, var(--surface-1) 80%, var(--surface-2) 80%, var(--surface-2) 85%, var(--surface-1) 85%, var(--surface-1) 90%, var(--surface-2) 90%, var(--surface-2) 95%, var(--surface-1) 95%, var(--surface-1) 100%, var(--surface-2) 100%
		); /*GENERATE: s = ""for(i = 2; i <= 100; i+= 2){  console.log(i)  if(i%4){    s += `var(--surface-2) ${i}%,\n`;    s += `var(--surface-1) ${i}%,\n`;	}else {    s += `var(--surface-1) ${i}%,\n`;    s += `var(--surface-2) ${i}%,\n`;  }}s */
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		cursor: pointer;
	}
	.active {
		outline: 2px solid rgb(var(--k-color-md-dark-primary) / var(--tw-bg-opacity));
		outline-offset: 2px;
	}
	input[type='date'] {
		width: 100%;
		padding: 16px;
		margin: 4px 0;
		background: var(--surface-3);
	}
	:global(.cover-block) {
		display: flex;
		gap: 1em;
	}
	:global(li.input > div) {
		margin: 0;
	}
	:global(.btn-reset) {
		color: Crimson !important;
		border-color: Crimson !important;
		margin: 0 auto;
		width: auto;
		min-width: 60%;
		--k-touch-ripple-color: rgba(220, 20, 60, 0.182);
	}
	:global(.btn-reset[disabled]) {
		opacity: 0.4;
	}
</style>
