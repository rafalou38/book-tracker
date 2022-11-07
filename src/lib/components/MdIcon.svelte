<script lang="ts">
	import { Icon } from 'konsta/svelte';
	export let outline = true;
</script>

<Icon class={!outline ? 'material-symbols-outlined' : 'material-symbols-fill'} {...$$restProps}>
	<slot>settings</slot>
</Icon>
