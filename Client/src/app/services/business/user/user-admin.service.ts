import { Injectable } from '@angular/core';
import { RequestService } from '../../common/request.service';
import { UserResponse } from '../../../source/models/dtos/user/user-response';
import { PageData } from '../../../source/models/common/page-data';

@Injectable({
    providedIn: 'root'
})
export class UserAdminService {

    constructor(private requestService: RequestService) { }

    getByPage(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) {	
		return this.requestService.get<PageData<UserResponse>>(`/user/admin/options/users/${sortColumn}/${sortOrder}/${pageSize}/${pageNumber}?term=${term}`, true);
	}

	getByPageAsync(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) : Promise<PageData<UserResponse>> {
		return new Promise((resolve, reject) => {
			this.getByPage(sortColumn, sortOrder, pageSize, pageNumber, term)
			.subscribe({
				next: (value) => {
					resolve(value);
				},
				error: (response) => {
					reject(response);
				}
			});
		});
	}

}
