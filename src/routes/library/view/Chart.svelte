<script lang="ts">
	import type { Book } from '$lib/db';
	// @ts-nocheck
	import Chart from 'svelte-frappe-charts';

	export let book: Book;
	const h24 = 1000 * 60 * 60 * 24;

	// Compute Labels
	const labels: string[] = [];
	const start = book.progress.start || Date.now() - h24 * 5;
	for (let i = start; i < book.progress.eta; i += h24) {
		const date = new Date(i);
		labels.push(date.toLocaleDateString());
	}

	function computeDatasets(book: Book) {
		const ref: number[] = [];
		const cur: number[] = [];
		let read = 0;
		let timestamp = start;
		for (let i = 0; i < labels.length; i++) {
			// debugger;

			if (timestamp < Date.now()) {
				cur.push(read);
			} else {
				cur.push();
			}

			ref.push(Math.round((i / labels.length) * book.stats.pagesCount));

			// console.log(timestamp < Date.now());

			read += Math.floor(Math.random() * (book.stats.pagesCount / labels.length) * 2);
			timestamp += h24;
		}
		cur.push(book.progress.current);

		return [
			{
				values: ref,
				name: 'Objectif'
			},
			{
				values: cur,
				name: 'Lus'
			}
		];
	}

	let data = {
		labels,
		datasets: computeDatasets(book)
	};

	$: {
		data.datasets = computeDatasets(book);
		console.log('updated dataset');
	}
</script>

<Chart
	{data}
	lineOptions={{ hideDots: 1, spline: 0.25 }}
	axisOptions={{ xIsSeries: true }}
	colors={['#888', 'blue']}
	type="line"
/>

<style>
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

	.material-symbols-fill {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
		color: #fff;
	}
</style>
