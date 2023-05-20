<script lang="ts">
	import type { Book } from '$lib/db';
	import { Day } from '$lib/utils/time';
	// @ts-nocheck
	import Chart from 'svelte-frappe-charts';

	export let book: Book;
	const h24 = 1000 * 60 * 60 * 24;

	let todayTarget = 0;

	let labels: number[] = [];
	for (let i = book.progress.start; i <= book.progress.eta; i += h24) {
		const date = new Day(i);
		labels.push(date.n());
	}

	function computeData(book: Book) {
		const ref: number[] = [];
		const cur: (number | undefined)[] = [];
		let ofDay: number | undefined = undefined;

		for (let i = 0; i < labels.length; i++) {
			ref.push(
				book.stats.pagesStart +
					Math.round((i / (labels.length - 1)) * (book.stats.pagesEnd - book.stats.pagesStart))
			);

			if (labels[i] == new Day().n()) {
				todayTarget = ref.at(-1) || 0;
			}

			ofDay = book.progress.daily.get(labels[i]) || ofDay;
			// Check if it's the last one
			if (ofDay)
				check: {
					for (let j = i; j < labels.length; j++) {
						if (book.progress.daily.get(labels[j])) break check;
					}
					ofDay = undefined;
				}

			console.log(ofDay);

			cur[i] = ofDay;
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

<div class="text-center text-stone-400 w-max mx-auto">
	{#if todayTarget > book.progress.current}
		Objectif du jour:
	{:else}
		<br />
		🎊 Objectif atteint
		<!-- else content here -->
	{/if}

	<span class="text-black dark:text-white font-bold">{todayTarget}</span>

	<div class="progress">
		<div style="--value: {(book.progress.current / todayTarget) * 100}%" />
	</div>
</div>

<Chart
	{data}
	lineOptions={{ hideDots: 1, spline: 0 }}
	axisOptions={{ xIsSeries: true }}
	colors={['#888', 'blue']}
	type="line"
/>

<style>
	.progress {
		background: var(--surface-2);
		height: 2px;
		width: 100%;
		border-radius: 4px;
		overflow: hidden;
	}
	.progress > div {
		background: currentColor;
		width: var(--value);
		height: 100%;
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
	:global(.dark .chart-container) {
		--charts-label-color: #9c9c9c;
		--charts-legend-label: #9c9c9c;
		--charts-tooltip-title: #9c9c9c;
		--charts-tooltip-value: #9c9c9c;
		--charts-tooltip-bg: var(--surface-2);
	}
	:global(.light .chart-container) {
		--charts-axis-line-color: #7e7e7e;
	}

	.material-symbols-fill {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
		color: #fff;
	}
</style>
