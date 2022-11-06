<script lang="ts">
	import { Icon } from 'konsta/svelte';
</script>

<Icon class="material-symbols-outlined">
	<slot>settings</slot>
</Icon>

<style lang="postcss">
	:global(.material-symbols-outlined) {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
	}
</style>
