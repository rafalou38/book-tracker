import Dexie from 'dexie';
import type { Table } from 'dexie';

export interface Book {
	id?: number;
	progress: {
		current: number;
	};
	stats: {
		pagesCount: number;
		pagesStart: number;
		pagesEnd: number;
	};
	info: {
		found: boolean;
		isbn: string;
		thumbnail: string;
		title: string;
		description: string;
		googleID: string;
	};
}

class CustomDexie extends Dexie {
	// 'friends' is added by dexie when declaring the stores()
	// We just tell the typing system this is the case
	books!: Table<Book>;

	constructor() {
		super('main');
		this.version(1).stores({
			books: '++id, info.title, progress.current'
		});
	}
}

export const db = new CustomDexie();
