<script lang="ts">
	import MdIcon from '$lib/components/MdIcon.svelte';
	import Library from '$lib/components/pages/Library.svelte';
	import Settings from '$lib/components/pages/Settings.svelte';
	import Stats from '$lib/components/pages/Stats.svelte';
	import { displayTitle } from '$lib/stores/page';
	import { ThemeStore } from '$lib/stores/theme';
	import { Page, Navbar, Link, Tabbar, TabbarLink } from '@rafaelmc-dev/konsta/svelte';
</script>

<!-- {#if activeTab == 'library'}
		<Library />
	{:else if activeTab == 'stats'}
		<Stats />
	{:else if activeTab == 'settings'}
		<Settings />
	{/if} -->
