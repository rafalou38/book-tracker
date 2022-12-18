<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Book } from '$lib/db';
	import { Button, Card, touchRipple } from '@rafaelmc-dev/konsta/svelte';

	export let data: Book;

	const percent = Math.round(
		(data.progress.current / (data.stats.pagesEnd - data.stats.pagesStart)) * 100
	);

	let cover = '';
	if (data.info.isbnCover) {
		cover = `https://covers.openlibrary.org/b/ISBN/${data.info.isbn}-L.jpg`;
	} else {
		cover = data.info.thumbnail;
	}
</script>

<button
	class="book touch-ripple-primary"
	style="--bg-url: url({cover})"
	use:touchRipple={true}
	on:click={() => goto(`/library/view?id=${data.id}`)}
>
	<span class="status {data.progress.status}" />
	<span class="progress" style="--percent: {percent}%">
		<span>{percent}%</span>
	</span>

	<p class="title">
		{data.info.title}
	</p>
</button>

<style lang="postcss">
	.book {
		@apply focus:outline-none z-10 relative rounded-lg;
		/* height: 200px;
		width: 150px; */
		aspect-ratio: 72/104;

		/* prettier-ignore */
		background: var(--bg-url),  linear-gradient(
			135deg, var(--surface-2) 0%, var(--surface-2) 5%, var(--surface-1) 5%, var(--surface-1) 10%, var(--surface-2) 10%, var(--surface-2) 15%, var(--surface-1) 15%, var(--surface-1) 20%, var(--surface-2) 20%, var(--surface-2) 25%, var(--surface-1) 25%, var(--surface-1) 30%, var(--surface-2) 30%, var(--surface-2) 35%, var(--surface-1) 35%, var(--surface-1) 40%, var(--surface-2) 40%, var(--surface-2) 45%, var(--surface-1) 45%, var(--surface-1) 50%, var(--surface-2) 50%, var(--surface-2) 55%, var(--surface-1) 55%, var(--surface-1) 60%, var(--surface-2) 60%, var(--surface-2) 65%, var(--surface-1) 65%, var(--surface-1) 70%, var(--surface-2) 70%, var(--surface-2) 75%, var(--surface-1) 75%, var(--surface-1) 80%, var(--surface-2) 80%, var(--surface-2) 85%, var(--surface-1) 85%, var(--surface-1) 90%, var(--surface-2) 90%, var(--surface-2) 95%, var(--surface-1) 95%, var(--surface-1) 100%, var(--surface-2) 100%
		); /*GENERATE: s = ""for(i = 2; i <= 100; i+= 2){  console.log(i)  if(i%4){    s += `var(--surface-2) ${i}%,\n`;    s += `var(--surface-1) ${i}%,\n`;	}else {    s += `var(--surface-1) ${i}%,\n`;    s += `var(--surface-2) ${i}%,\n`;  }}s */
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		cursor: pointer;
	}
	.progress {
		/* font-size: 1.5em; */
		/* font-family: mo; */
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		padding: 0.25em 1em;
		border-radius: 0.25em;
		background: linear-gradient(
			135deg,
			rgb(var(--k-color-md-dark-primary)) var(--percent),
			var(--surface-1) var(--percent),
			var(--surface-1) 100%
		);
	}
	:global(.light .progress span) {
		filter: drop-shadow(0px 0px 1px rgb(255, 255, 255)) drop-shadow(0px 0px 1px rgb(255, 255, 255));
	}
	:global(.dark .progress span) {
		filter: drop-shadow(0px 0px 1px #000) drop-shadow(0px 0px 1px #000);
	}
	.status {
		font-size: 1.5em;
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		width: 0.75em;
		height: 0.5em;
		border-radius: 0.25em;
	}
	.planned {
		background: gray;
	}
	.reading {
		background: LimeGreen;
	}
	.finished {
		background: DodgerBlue;
	}
	.title {
		position: absolute;
		width: 100%;
		color: white;
		/* height: 2em; */
		padding: 0.5em;
		padding-top: 2em;
		bottom: 0;
		filter: drop-shadow(0px 0px 2px #000) drop-shadow(0px 0px 2px #000);
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.25) 100%);
	}
</style>
