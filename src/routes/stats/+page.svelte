<script>
	import MdIcon from '$lib/components/MdIcon.svelte';
	import { activeTab } from '$lib/stores/page';
	import { ThemeStore } from '$lib/stores/theme';

	import { Link, Navbar } from '@rafaelmc-dev/konsta/svelte';
	import { onMount } from 'svelte';

	onMount(() => activeTab.set('stats'));
</script>

<Navbar title="Stats">
	<Link navbar iconOnly slot="right" onClick={() => ($ThemeStore.isDark = !$ThemeStore.isDark)}>
		{#if $ThemeStore.isDark}
			<MdIcon>light_mode</MdIcon>
		{:else}
			<MdIcon>dark_mode</MdIcon>
		{/if}
	</Link>
</Navbar>

<p class="w-full h-full grid place-items-center">Coming soon...</p>
