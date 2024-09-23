import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    pipe!: DatePipe;

    constructor() { 
        this.pipe = new DatePipe('es-MX');
    }

    get_longDate(date: Date) {
		let strDate = this.pipe.transform(date, 'longDate');
		return strDate;
	}

    get_time(date: Date) {
		let strDate = this.pipe.transform(date, 'mediumTime');
		return strDate;
	}
}
