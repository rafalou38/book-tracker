import { derived, writable } from 'svelte/store';

export const activeTab = writable<'library' | 'stats' | 'settings' | ''>('library');
export const displayTitle = derived(activeTab, (v) => {
	switch (v) {
		case 'library':
			return 'Library';
		case 'stats':
			return 'Stats';
		case 'settings':
			return 'Settings';
		default:
			return 'Book tracker';
	}
});
