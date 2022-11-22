<script lang="ts">
	import MdIcon from '$lib/components/MdIcon.svelte';
	import type { Book } from '$lib/db';
	import { Link, Navbar } from '@rafaelmc-dev/konsta/svelte';
	// @ts-nocheck
	import Chart from 'svelte-frappe-charts';

	export let book: Book;

	const labels: string[] = [];
	const ref: number[] = [];
	const cur: number[] = [];
	const start = book.progress.start || Date.now();

	const h24 = 1000 * 60 * 60 * 24;
	for (let i = start; i < book.progress.eta; i += h24) {
		const date = new Date(i);
		labels.push(date.toLocaleDateString());
	}

	let read = 0;
	for (let i = 0; i < labels.length; i++) {
		ref.push((i / labels.length) * book.stats.pagesCount);
		cur.push(read);

		read += Math.floor(Math.random() * (book.stats.pagesCount / labels.length) * 2);
	}

	let data = {
		labels,
		datasets: [
			{
				values: ref,
				name: 'Objectif'
			},
			{
				values: cur,
				name: 'Lus'
			}
		]
	};
</script>

<Navbar title={book.info.title}>
	<Link navbar iconOnly slot="left" href="/library">
		<MdIcon>arrow_back</MdIcon>
	</Link>
	<Link navbar iconOnly slot="right" href="/library/edit?id={book.id}">
		<MdIcon>edit</MdIcon>
	</Link>
</Navbar>

<Chart
	{data}
	lineOptions={{ hideDots: 1, spline: 0.25 }}
	axisOptions={{ xIsSeries: true }}
	colors={['#888', 'blue']}
	type="line"
/>

<!-- <div class="flex bg-md-dark-surface-1 p-4 py-8 gap-4 items-stretch">
				<div class="w-1/3 max-w-[200px] shrink-0 grid">
					<img src={book.info.thumbnail} alt="cover" class="w-full " />
				</div>
				<div class="bg-md-dark-surface p-2 px-4  overflow-y-scroll">
					<h2 class="font-bold text-xl">{book.info.title}</h2>
					<p class="text-sm">{book.info.description}</p>
				</div>
			</div> -->
<style>
	:global(.chart-container .axis, .chart-container .chart-label) {
		opacity: 1;
	}
	:global(line) {
		opacity: 0.25;
	}
</style>
