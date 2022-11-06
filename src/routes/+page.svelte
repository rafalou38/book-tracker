<script lang="ts">
	import MdIcon from '$lib/components/MdIcon.svelte';
	import Library from '$lib/components/pages/Library.svelte';
	import Settings from '$lib/components/pages/Settings.svelte';
	import Stats from '$lib/components/pages/Stats.svelte';
	import { ThemeStore } from '$lib/stores/theme';
	import { Page, Navbar, Link, Tabbar, TabbarLink } from 'konsta/svelte';
	let activeTab: 'library' | 'stats' | 'settings' = 'library';
	let displayTitle = 'Book tracker';
	$: switch (activeTab) {
		case 'library':
			displayTitle = 'Library';
			break;
		case 'stats':
			displayTitle = 'Stats';
			break;
		case 'settings':
			displayTitle = 'Settings';
			break;
		default:
			displayTitle = 'Book tracker';
			break;
	}

	let hasLabels = true;
</script>

<svelte:head>
	<title>Book tracker | {displayTitle}</title>
</svelte:head>

<Page>
	<Navbar title={displayTitle}>
		<Link navbar iconOnly slot="right" onClick={() => ($ThemeStore.isDark = !$ThemeStore.isDark)}>
			{#if $ThemeStore.isDark}
				<MdIcon>light_mode</MdIcon>
			{:else}
				<MdIcon>dark_mode</MdIcon>
			{/if}
		</Link>
	</Navbar>

	{#if activeTab == 'library'}
		<Library />
	{:else if activeTab == 'stats'}
		<Stats />
	{:else if activeTab == 'settings'}
		<Settings />
	{/if}

	<Tabbar icons class="left-0 bottom-0 fixed">
		<TabbarLink
			active={activeTab === 'library'}
			onClick={() => (activeTab = 'library')}
			label={hasLabels ? 'Library' : ''}
		>
			<svelte:fragment slot="icon">
				<MdIcon>collections_bookmark</MdIcon>
			</svelte:fragment>
		</TabbarLink>

		<TabbarLink
			active={activeTab === 'stats'}
			onClick={() => (activeTab = 'stats')}
			label={hasLabels ? 'Stats' : ''}
		>
			<svelte:fragment slot="icon">
				<MdIcon>monitoring</MdIcon>
			</svelte:fragment>
		</TabbarLink>

		<TabbarLink
			active={activeTab === 'settings'}
			onClick={() => (activeTab = 'settings')}
			label={hasLabels ? 'Settings' : ''}
		>
			<svelte:fragment slot="icon">
				<MdIcon>settings</MdIcon>
			</svelte:fragment>
		</TabbarLink>
	</Tabbar>
</Page>
