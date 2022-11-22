import { browser } from '$app/environment';
import { db, type ReadingStatus } from '$lib/db';
import type { GoogleBookRessource } from '../books/types';

export async function addGoogleBookToLibrary(book: GoogleBookRessource) {
	const isbn =
		book.volumeInfo.industryIdentifiers?.find((id) => id.type == 'ISBN_13')?.identifier || '';
	await db.books.add({
		id: parseInt(Date.now().toString() + (Math.random() * 1000).toString()),
		info: {
			title: book.volumeInfo.title,
			description: book.volumeInfo.description,
			googleID: book.id,
			isbn,
			found: true,
			thumbnail:
				book.volumeInfo.imageLinks?.thumbnail ||
				'https://books.google.fr/googlebooks/images/no_cover_thumb.gif',
			isbnCover: false
			// `https://covers.openlibrary.org/b/ISBN/${isbn}-L.jpg`
		},
		progress: {
			current: 0,
			eta: Date.now() + 1000 * 60 * 60 * 24 * 7 * 2,
			start: 0,
			status: 'planned',
			daily: []
		},
		stats: {
			pagesCount: book.volumeInfo.pageCount,
			pagesEnd: book.volumeInfo.pageCount,
			pagesStart: 0
		}
	});
}

export function getLibrary() {
	if (!browser) return [];
	return db.books.where('progress.status').notEqual('finished').toArray();
}

export function getBook(id: number) {
	if (!browser) return [];
	return db.books.where('id').equals(id).first();
}
