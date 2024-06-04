import { Injectable } from '@angular/core';
import { RequestService } from '../../common/request.service';
import { UserResponse } from '../../../source/models/dtos/user/common/user-response';
import { PageData } from '../../../source/models/common/page-data';
import { CreateUserRequest } from '../../../source/models/dtos/user/administration/create-user-request';
import { ChangeRoleRequest } from '../../../source/models/dtos/user/administration/change-role-request';

@Injectable({
    providedIn: 'root'
})
export class UserAdministrationService {

    constructor(private requestService: RequestService) { }

    getByPage(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) {	
		return this.requestService.get<PageData<UserResponse>>(`/user/administration/users/${sortColumn}/${sortOrder}/${pageSize}/${pageNumber}?term=${term}`);
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

	createUser(model: CreateUserRequest) {
		return this.requestService.post('/user/administration/users', model);
	}

	changeRole(model: ChangeRoleRequest) {
		return this.requestService.put('/user/administration/users/role', model);
	}
}
