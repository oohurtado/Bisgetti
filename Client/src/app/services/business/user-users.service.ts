import { Injectable } from '@angular/core';
import { RequestService } from '../common/request.service';
import { UserResponse } from '../../source/models/dtos/entities/user-response';
import { PageData } from '../../source/models/common/page-data';
import { CreateUserRequest } from '../../source/models/dtos/users/role/create-user-request';
import { ChangeRoleRequest } from '../../source/models/dtos/users/role/change-role-request';

@Injectable({
    providedIn: 'root'
})
export class UserUsersService {

    constructor(private requestService: RequestService) { }

    getUsersByPage(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) {	
		return this.requestService.get<PageData<UserResponse>>(`/user/users/${sortColumn}/${sortOrder}/${pageSize}/${pageNumber}?term=${term}`);
	}

	getUsersByPageAsync(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) : Promise<PageData<UserResponse>> {
		return new Promise((resolve, reject) => {
			this.getUsersByPage(sortColumn, sortOrder, pageSize, pageNumber, term)
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

	changeRole(model: ChangeRoleRequest) {
		return this.requestService.put('/user/users/role', model);
	}
}
