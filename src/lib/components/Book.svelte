<script lang="ts">
	import { Button, Card, touchRipple } from '@rafaelmc-dev/konsta/svelte';

	export let imageUrl: string;
</script>

<button
	class="book touch-ripple-primary"
	style="--bg-url: url({imageUrl})"
	use:touchRipple={true}
/>

<style lang="postcss">
	.book {
		@apply focus:outline-none z-10;
		/* height: 200px;
		width: 150px; */
		aspect-ratio: 72/104;

		--light: #3c3c44;
		--dark: #323239;
		/* prettier-ignore */
		background: var(--bg-url),  linear-gradient(
			135deg, var(--dark) 0%, var(--dark) 5%, var(--light) 5%, var(--light) 10%, var(--dark) 10%, var(--dark) 15%, var(--light) 15%, var(--light) 20%, var(--dark) 20%, var(--dark) 25%, var(--light) 25%, var(--light) 30%, var(--dark) 30%, var(--dark) 35%, var(--light) 35%, var(--light) 40%, var(--dark) 40%, var(--dark) 45%, var(--light) 45%, var(--light) 50%, var(--dark) 50%, var(--dark) 55%, var(--light) 55%, var(--light) 60%, var(--dark) 60%, var(--dark) 65%, var(--light) 65%, var(--light) 70%, var(--dark) 70%, var(--dark) 75%, var(--light) 75%, var(--light) 80%, var(--dark) 80%, var(--dark) 85%, var(--light) 85%, var(--light) 90%, var(--dark) 90%, var(--dark) 95%, var(--light) 95%, var(--light) 100%, var(--dark) 100%
		); /*GENERATE: s = ""for(i = 2; i <= 100; i+= 2){  console.log(i)  if(i%4){    s += `var(--dark) ${i}%,\n`;    s += `var(--light) ${i}%,\n`;	}else {    s += `var(--light) ${i}%,\n`;    s += `var(--dark) ${i}%,\n`;  }}s */
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		cursor: pointer;
	}
</style>
