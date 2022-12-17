export class Day {
	private date: Date;
	constructor(id?: number) {
		if (id) {
			this.date = new Date(id);
		} else {
			this.date = new Date();
		}

		this.normalize();
	}

	private normalize() {
		this.date.setHours(0);
		this.date.setMinutes(0);
		this.date.setSeconds(0);
		this.date.setMilliseconds(0);
	}

	public n() {
		return this.save();
	}
	public save() {
		return this.date.getTime();
	}
	public export() {
		return this.date.getDay() + '/' + (this.date.getMonth() + 1) + '/' + this.date.getFullYear();
	}
}
