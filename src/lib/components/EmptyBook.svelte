<script lang="ts">
	import { Button, Card, touchRipple } from '@rafaelmc-dev/konsta/svelte';
	import MdIcon from './MdIcon.svelte';
</script>

<button class="book touch-ripple-primary" use:touchRipple={true}>
	<div class="content flex items-center justify-center flex-col ">
		<!-- <span class="material-symbols-outlined w-1/2 aspect-square">add</span> -->
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-1/3 aspect-square">
			<path
				fill="currentColor"
				d="M25.5 29.1h3v-6.6h6.6v-3h-6.6v-6.6h-3v6.6h-6.6v3h6.6ZM13 38q-1.2 0-2.1-.9-.9-.9-.9-2.1V7q0-1.2.9-2.1.9-.9 2.1-.9h28q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm-6 6q-1.2 0-2.1-.9Q4 42.2 4 41V10h3v31h31v3Z"
			/>
		</svg>
		<!-- <span class="text-3xl">Add book</span> -->
	</div>
</button>

<style lang="postcss">
	.book {
		@apply focus:outline-none z-10;

		position: relative;
		aspect-ratio: 72/104;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		cursor: pointer;
	}
	.content {
		border-radius: 0.5rem;
		position: absolute;
		inset: 0;
		border: 4px dashed currentColor;
	}

	:global(.dark .content) {
		color: rgb(var(--k-color-md-dark-on-surface) / 0.2);
	}
	:global(.light .content) {
		color: rgb(var(--k-color-md-light-on-surface) / 0.2);
	}
	:global(.light .book) {
		--k-touch-ripple-color: var(--k-touch-ripple-black);
	}
</style>
