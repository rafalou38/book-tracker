<script lang="ts">
	import { Icon } from '@rafaelmc-dev/konsta/svelte';
	export let outline = true;
</script>

<Icon class={!outline ? 'material-symbols-outlined' : 'material-symbols-fill'} {...$$restProps}>
	<slot>settings</slot>
</Icon>
