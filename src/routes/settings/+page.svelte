<script>
	import { goto } from '$app/navigation';
	import MdIcon from '$lib/components/MdIcon.svelte';
	import { db } from '$lib/db';
	import { activeTab } from '$lib/stores/page';
	import { ThemeStore } from '$lib/stores/theme';

	import { Button, Dialog, DialogButton, Link, Navbar } from '@rafaelmc-dev/konsta/svelte';
	import { onMount } from 'svelte';

	onMount(() => activeTab.set('settings'));
	let confirmClear = false;
</script>

<Navbar title="Settings">
	<Link navbar iconOnly slot="right" onClick={() => ($ThemeStore.isDark = !$ThemeStore.isDark)}>
		{#if $ThemeStore.isDark}
			<MdIcon>light_mode</MdIcon>
		{:else}
			<MdIcon>dark_mode</MdIcon>
		{/if}
	</Link>
</Navbar>

<Button class="btn-reset" outline onClick={() => (confirmClear = true)}>Clear database</Button>
<Dialog
	opened={confirmClear}
	onBackdropClick={() => {
		confirmClear = false;
	}}
	class="duration-200"
>
	<svelte:fragment slot="title">Are you sure</svelte:fragment>
	This action can't be reverted
	<svelte:fragment slot="buttons">
		<DialogButton
			onClick={() => {
				confirmClear = false;
				confirmDelete = false;
			}}>No</DialogButton
		>
		<DialogButton
			strong
			onClick={async () => {
				await db.books.clear();
				goto('/library');
			}}>Yes</DialogButton
		>
	</svelte:fragment>
</Dialog>
