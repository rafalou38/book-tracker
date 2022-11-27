<script lang="ts">
	import { Link } from '@rafaelmc-dev/konsta/svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import Book from '../Book.svelte';
	import { NumberSwiper } from './number-swiper';
	import './number-swiper.css';

	export let min = 0;
	export let max = 100;
	export let current = 20;

	const dispatch = createEventDispatcher();

	let choices: number[] = [];

	for (let i = min; i < max; i++) {
		choices.push(i);
	}

	let timeout: NodeJS.Timeout;
	const observer = new MutationObserver((mutationList) => {
		const { target } = mutationList[0];
		if (!(target instanceof HTMLDivElement)) return;
		const value = parseInt(target.dataset.value || '');

		if (isNaN(value)) return;

		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => {
			current = value;
			dispatch('change', value);
		}, 500);
	});

	let swiper: NumberSwiper;
	onMount(() => {
		swiper = new NumberSwiper('myNumberSwiper', current);

		if (!swiper.el) throw new Error('No element associated with swiper');
		observer.observe(swiper.el, {
			attributes: true,
			attributeFilter: ['data-value']
		});
	});

	$: {
		if (swiper) swiper.setColumnValue(1, current);
	}
</script>

<div class="flex">
	<div class="w-1/3 grid place-items-center">
		<Link iconOnly onClick={() => swiper.setColumnValue(1, 'down')}>
			<i class="material-symbols-fill m-4"> remove </i>
		</Link>
	</div>
	<div class="w-1/3">
		<div id="myNumberSwiper" class="number-swiper" data-value="">
			<ol class="number-swiper-column number-swiper-column-1" data-column="1">
				<!-- <li><span class="number number-swiper-active-number">{number}</span></li> -->
				<!-- <li class="number-swiper-active-number" /> -->
				{#each choices as number}
					<li>
						<span class="number">{number}</span>
					</li>
				{/each}
			</ol>
			<input class="number-swiper-value" type="hidden" min="0" max="99" />
		</div>
	</div>
	<div class="w-1/3 grid place-items-center">
		<Link iconOnly onClick={() => swiper.setColumnValue(1, 'up')}>
			<i class="material-symbols-fill  m-4"> add </i>
		</Link>
	</div>
</div>

<style>
	.number-swiper {
		font-size: 5rem;
	}
	.number-swiper-column {
		width: 3ch;
	}
	li {
		position: relative;
		text-align: center;
		opacity: 0.25;
		transition: opacity 100ms linear;
		margin: 0.25em 0.1em 0.25em 0.1em;
	}
	.number {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	:global(.number-swiper-active-number) {
		opacity: 1 !important;
	}
</style>
