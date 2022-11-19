<script>
	import '../app.postcss';
	import { App, Page, Tabbar, TabbarLink } from 'konsta/svelte';
	import { ThemeStore } from '$lib/stores/theme';
	import MdIcon from '$lib/components/MdIcon.svelte';
	import { activeTab, displayTitle } from '$lib/stores/page';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	// import { db } from '$lib/db';

	let hasLabels = true;

	onMount(() => {
		document.querySelectorAll('.tabBarLink').forEach((e) => {
			if (!(e instanceof HTMLAnchorElement)) return;
			e.ondragstart = () => false;
		});
	});
</script>

<svelte:head>
	<title>Book tracker | {$displayTitle}</title>
</svelte:head>

<App theme={$ThemeStore.style} class={$ThemeStore.isDark ? 'dark' : 'light'}>
	<Page class="flex flex-col">
		<slot />

		<div class="TabBarCover" />
		<Tabbar icons class="left-0 bottom-0 fixed">
			{@const libAct = $activeTab === 'library'}
			<TabbarLink
				href="/library"
				active={libAct}
				label={hasLabels ? 'Library' : ''}
				onDragStart={() => false}
				class="tabBarLink"
			>
				<svelte:fragment slot="icon">
					<MdIcon outline={!libAct}>collections_bookmark</MdIcon>
				</svelte:fragment>
			</TabbarLink>

			{@const statAct = $activeTab === 'stats'}
			<TabbarLink
				href="/stats"
				active={statAct}
				label={hasLabels ? 'Stats' : ''}
				onDragStart={() => false}
				class="tabBarLink"
			>
				<svelte:fragment slot="icon">
					<MdIcon outline={!statAct}>monitoring</MdIcon>
				</svelte:fragment>
			</TabbarLink>

			{@const cogAct = $activeTab === 'settings'}
			<TabbarLink
				href="/settings"
				active={cogAct}
				label={hasLabels ? 'Settings' : ''}
				onDragStart={() => console.log('drag')}
				class="tabBarLink"
			>
				<svelte:fragment slot="icon">
					<MdIcon outline={!cogAct}>settings</MdIcon>
				</svelte:fragment>
			</TabbarLink>
		</Tabbar>
	</Page>
</App>

<style>
	.TabBarCover {
		height: 5rem;
		flex-shrink: 0;
	}
</style>
