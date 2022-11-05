<script>
	import { ThemeStore } from '$lib/stores/theme';
	import {
		Page,
		Navbar,
		Block,
		Button,
		List,
		ListItem,
		BlockTitle,
		Radio,
		Icon,
		Link
	} from 'konsta/svelte';
</script>

<Page>
	<Navbar title="My App">
		<Link navbar iconOnly slot="right" onClick={() => ($ThemeStore.isDark = !$ThemeStore.isDark)}>
			{#if $ThemeStore.isDark}
				<Icon>🌙</Icon>
			{:else}
				<Icon>☀️</Icon>
			{/if}
		</Link>
	</Navbar>

	<Block strong>
		<p>Here is your SvelteKit & Konsta UI app. Let's see what we have here.</p>
	</Block>
	<BlockTitle>Navigation</BlockTitle>
	<List>
		<ListItem href="/" title="About" />
		<ListItem href="/" title="Form" />
	</List>

	<Block strong class="flex space-x-4">
		<Button>Button 1</Button>
		<Button outline>Button 2</Button>
	</Block>
	<BlockTitle>Theme</BlockTitle>
	<List strong class="">
		<ListItem label title="Android">
			<Radio
				slot="after"
				component="div"
				value="Android"
				checked={$ThemeStore.style == 'material'}
				onChange={() => ($ThemeStore.style = 'material')}
			/>
		</ListItem>
		<ListItem label title="ios">
			<Radio
				slot="after"
				component="div"
				value="ios"
				checked={$ThemeStore.style == 'ios'}
				onChange={() => ($ThemeStore.style = 'ios')}
			/>
		</ListItem>
	</List>
</Page>
