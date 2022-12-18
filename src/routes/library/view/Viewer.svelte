<script lang="ts">
	import MdIcon from '$lib/components/MdIcon.svelte';
	import NumberSwiper from '$lib/components/numberSwiper/NumberSwiper.svelte';
	import type { Book } from '$lib/db';
	import { setBookProgress } from '$lib/utils/Library';
	import { Fab, Link, Navbar, Stepper } from '@rafaelmc-dev/konsta/svelte';
	import Chart from './Chart.svelte';

	export let book: Book;
</script>

<div class="flex max-h-52 p-4 viewHeader">
	<div class="w-2/3 flex flex-col justify-between">
		<Link iconOnly href="/library" style="width: max-content">
			<i class="material-symbols-fill">
				<slot>arrow_back</slot>
			</i>
		</Link>
		<h1 class="font-bold ml-0 m-4">
			{book.info.title}
		</h1>
	</div>
	<div class="w-1/3 p-1">
		{#if book.info.isbnCover}
			<img
				src="https://covers.openlibrary.org/b/ISBN/{book.info.isbn}-L.jpg"
				alt=""
				class="w-full h-full object-contain"
			/>
		{:else}
			<img src={book.info.thumbnail} alt="cover" class="w-full h-full object-contain" />
		{/if}
	</div>
</div>

<NumberSwiper
	current={book.progress.current}
	min={book.stats.pagesStart}
	max={book.stats.pagesEnd}
	on:change={async ({ detail }) => {
		book = await setBookProgress(book, detail);
	}}
/>

{#if book.progress.status != 'planned'}
	<Chart {book} />
{/if}

<Fab class="absolute right-4-safe bottom-4-safe z-20" href="/library/edit?id={book.id}">
	<MdIcon slot="icon">edit</MdIcon>
</Fab>

<!-- <div class="flex bg-md-dark-surface-1 p-4 py-8 gap-4 items-stretch">
				<div class="w-1/3 max-w-[200px] shrink-0 grid">
					<img src={book.info.thumbnail} alt="cover" class="w-full " />
				</div>
				<div class="bg-md-dark-surface p-2 px-4  overflow-y-scroll">
					<h2 class="font-bold text-xl">{book.info.title}</h2>
					<p class="text-sm">{book.info.description}</p>
				</div>
			</div> -->
<style lang="postcss">
	.viewHeader {
		background: var(--surface-2);
	}
	:global(.nav .text-left) {
		max-width: 80%;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	:global(.chart-container .axis, .chart-container .chart-label) {
		opacity: 1;
	}
	:global(line) {
		opacity: 0.25;
	}

	:global(span.text-icon-material) {
		display: contents;
	}

	.material-symbols-fill {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
		/* color: #fff; */
	}
</style>
