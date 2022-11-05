<script>
	import '../app.postcss';
	import { App } from 'konsta/svelte';
	import { ThemeStore } from '$lib/stores/theme';
</script>

<App theme={$ThemeStore.style} class={$ThemeStore.isDark ? 'dark' : 'light'}>
	<slot />
</App>
