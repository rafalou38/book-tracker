import { db, type Book } from '$lib/db';
import { Day } from './time';

export async function setBookProgress(book: Book, progress: number) {
	const today = new Day();

	if (progress > 0 && book.progress.status == 'planned') {
		book.progress.status = 'reading';
		book.progress.start = today.n();
		book.progress.eta = today.n() + 1000 * 60 * 60 * 24 * 14;
	}
	if (progress == 0 && book.progress.status == 'reading') {
		book.progress.status = 'planned';
	}

	// let totalBeforeToday = 0;
	// for (const [time, pagesOfDay] of book.progress.daily) {
	// 	const day = new Day(time);
	// 	if (day.n() != today.n()) totalBeforeToday += pagesOfDay;
	// }

	// const readToday = progress - totalBeforeToday;

	book.progress.daily.set(today.n(), progress);
	book.progress.current = progress;

	db.books.put(book);

	return book;
}
