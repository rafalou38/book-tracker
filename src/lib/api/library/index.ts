import { db, type ReadingStatus } from '$lib/db';
import type { GoogleBookRessource } from '../books/types';

export async function addGoogleBookToLibrary(book: GoogleBookRessource) {
	await db.books.add({
		id: parseInt(Date.now().toString() + (Math.random() * 1000).toString()),
		info: {
			title: book.volumeInfo.title,
			description: book.volumeInfo.description,
			googleID: book.id,
			isbn:
				book.volumeInfo.industryIdentifiers?.find((id) => id.type == 'ISBN_13')?.identifier || '',
			found: true,
			thumbnail:
				book.volumeInfo.imageLinks?.thumbnail ||
				'https://books.google.fr/googlebooks/images/no_cover_thumb.gif'
		},
		progress: {
			current: 0,
			eta: Date.now() + 1000 * 60 * 60 * 24 * 7 * 2,
			status: 'planned'
		},
		stats: {
			pagesCount: book.volumeInfo.pageCount,
			pagesEnd: book.volumeInfo.pageCount,
			pagesStart: 0
		}
	});
}

export function getLibrary(status: ReadingStatus) {
	return db.books.where('progress.status').equals(status);
}
