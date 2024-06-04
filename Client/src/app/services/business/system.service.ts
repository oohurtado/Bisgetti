import { Injectable } from '@angular/core';
import { RequestService } from '../common/request.service';

@Injectable({
    providedIn: 'root'
})
export class SystemService {

    constructor(private requestService: RequestService) { }

    datetime() {
		return this.requestService.get<Date>('/system/datetime');
	}
}
