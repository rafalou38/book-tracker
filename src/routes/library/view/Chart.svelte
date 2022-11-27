<script lang="ts">
	import type { Book } from '$lib/db';
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
		ref.push(Math.round((i / labels.length) * book.stats.pagesCount));
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
