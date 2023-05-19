import type { GoogleBookRessource } from './types';

export async function searchBookByNameFromGoogle(query: string) {
	const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

	const url = BASE_URL + encodeURIComponent(query);
	const response = await fetch(url);

	const data = await response.json();

	return data.items as GoogleBookRessource[];
}
