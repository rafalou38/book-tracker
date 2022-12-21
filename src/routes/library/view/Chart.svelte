<script lang="ts">
	import type { Book } from '$lib/db';
	import { Day } from '$lib/utils/time';
	// @ts-nocheck
	import Chart from 'svelte-frappe-charts';

	export let book: Book;
	const h24 = 1000 * 60 * 60 * 24;

	let labels: number[] = [];
	for (let i = book.progress.start; i < book.progress.eta; i += h24) {
		const date = new Day(i);
		labels.push(date.n());
	}

	function computeData(book: Book) {
		const ref: number[] = [];
		const cur: (number | undefined)[] = [];
		let timestamp = book.progress.start;
		for (let i = 0; i < labels.length; i++) {
			ref.push(Math.round((i / labels.length) * book.stats.pagesCount));

			const ofDay = book.progress.daily.get(labels[i]);
			if (ofDay) cur.push(ofDay);
			else cur.push(undefined);
			timestamp += h24;
		}

		const localLabels = labels.map((n) =>
			new Date(n).toLocaleDateString(undefined, {
				weekday: 'short',
				month: 'short',
				day: 'numeric'
			})
		);

		return {
			labels: localLabels,
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
	}

	let data = computeData(book);

	$: {
		data = computeData(book);
		console.log('updated dataset', data);
	}
</script>

<Chart
	{data}
	lineOptions={{ hideDots: 1, spline: 0 }}
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
