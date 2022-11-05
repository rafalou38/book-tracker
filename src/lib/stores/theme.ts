import { writable } from 'svelte/store';

export type Theme = {
	style: 'material' | 'ios';
	isDark: boolean;
};
export const ThemeStore = writable<Theme>({
	style: 'material',
	isDark: true
});
